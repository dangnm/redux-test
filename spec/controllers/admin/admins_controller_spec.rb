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

  describe "GET #index" do
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
end
