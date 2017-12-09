require 'rails_helper'

RSpec.describe Admin::AdminsController, type: :controller do
  describe "GET #index" do
    let!(:admin_1) { create(:admin, email: "test@admin.com") }
    before do
      sign_in admin_1
    end

    it "returns http success" do
      get :index, page: 1, format: :json
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["data"]).to include("items_per_page" => 5)
      expect(JSON.parse(response.body)["data"]).to include("page_index" => 1)
      expect(JSON.parse(response.body)["data"]).to include("total_pages" => 1)
      expect(JSON.parse(response.body)["data"]["items"].first).to include("id" => admin_1.id)
      expect(JSON.parse(response.body)["data"]["items"].first)
        .to include("email" => "test@admin.com")
    end
  end

  describe "POST #create" do
    let!(:admin_1) { create(:admin, email: "test@admin.com") }
    before do
      sign_in admin_1
    end

    context "All fields are correct" do
      it "returns success" do
        post :create, admin: {
               email: "test2@admin.com",
               password: "1234qwer",
               password_confirmation: "1234qwer"
             }, format: :json
        expect(response).to have_http_status(:success)
        result = Admin.find_by(email: "test2@admin.com")
        expect(result).not_to be_nil
      end
    end

    context "Email with incorrect format" do
      it "returns failed" do
        post :create, admin: {
               email: "test2",
               password: "1234qwer",
               password_confirmation: "1234qwer"
             }, format: :json
        expect(response).to have_http_status(400)
        expect(JSON.parse(response.body)["error"])
          .to include("errors" => [{
                                       "reason" => "invalid",
                                       "message" => "Email format is invalid",
                                       "location" => "email",
                                       "location_type" => "field"
                                     }])
        result = Admin.find_by(email: "test2")
        expect(result).to be_nil
      end
    end

    context "Email is duplicated" do
      let!(:admin_1) { create(:admin, email: "test@admin.com") }
      it "returns failed" do
        post :create, admin: {
               email: "test@admin.com",
               password: "1234qwer",
               password_confirmation: "1234qwer"
             }, format: :json
        expect(response).to have_http_status(400)
        expect(JSON.parse(response.body)["error"])
          .to include("errors" => [{
                                       "reason" => "taken",
                                       "message" => "Email has already been taken",
                                       "location" => "email",
                                       "location_type" => "field"
                                     }])
        result = Admin.find_by(email: "test2")
        expect(result).to be_nil
      end
    end
  end
  describe "GET #show" do
    let!(:admin_1) { create(:admin, email: "test@admin.com", first_name: 'a', last_name: 'b') }
    before do
      sign_in admin_1
    end

    it "returns correct data" do
      get :show, id: admin_1.id, format: :json
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body))
        .to include("data" => {
                      "id" => admin_1.id,
                      "email" => admin_1.email,
                      "first_name" => "a",
                      "last_name" => "b",
                      "created_at" => admin_1.created_at.to_i,
                      "updated_at" => admin_1.updated_at.to_i
                    })
    end
  end
  describe "GET #update" do
    let!(:admin_1) { create(:admin, email: "test@admin.com", first_name: 'a', last_name: 'b') }
    before do
      sign_in admin_1
    end
    context "All params are correct" do
      it "updates data successfully" do
        put :update, id: admin_1.id,
                     admin: { first_name: 'a1' },
                     format: :json
        expect(response).to have_http_status(201)
        expect(JSON.parse(response.body))
          .to include({})
        expect(admin_1.reload.first_name).to eq('a1')
      end
    end

    context "Password does not match" do
      it "updates data unsuccessfully" do
        put :update, id: admin_1.id,
                     admin: { first_name: 'a1',
                              password: "a12345678",
                              password_confirmation: "b22222222" },
                     format: :json
        expect(response).to have_http_status(400)
        expect(JSON.parse(response.body)["error"])
          .to include("errors" => [{
                                     "reason" => "confirmation",
                                     "message" => "Password confirmation doesn't match Password",
                                     "location" => "password_confirmation",
                                     "location_type" => "field"
                                   }])
        expect(admin_1.reload.first_name).to eq('a')
      end
    end
  end
end
