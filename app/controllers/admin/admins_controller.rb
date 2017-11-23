class Admin::AdminsController < Admin::BaseController
  def index
    @admins = Admin.order(updated_at: :desc)
                   .page(params[:page]).per(DEFAULT_ITEMS_PER_PAGE)

    respond_to do |format|
      format.json {
        render json: serializable_resource_wrapper(@admins, AdminSerializer)
      }
    end
  end

  def show
    @admin = Admin.find_by(id: params[:id])

    respond_to do |format|
      format.json {
        render json: serializable_resource_wrapper(@admin, AdminSerializer)
      }
    end
  end

  def create
    @admin = Admin.new(new_admin_params)
    if @admin.save
      respond_to do |format|
        format.json  {
          render json: {}
        }
      end
    else
      if @admin.errors.messages.values
        error_messages = render_errors(@admin.errors)
      end

      respond_to do |format|
        format.json {
          render json: error_messages, status: 400
        }
      end
    end
  end

  def update
    admin = Admin.find_by(id: params[:id])
    admin.update_attributes(update_admin_params)
    respond_to do |format|
      format.json {
        render json: {}, status: :created
      }
    end
  end

  private

  def new_admin_params
    params_admin = params.require(:admin)
    params_admin.permit(:email, :first_name, :last_name, :password, :password_confirmation)
  end

  def update_admin_params
    params_admin = params.require(:admin)
    params_admin.permit(:first_name, :last_name, :password, :password_confirmation)
  end
end
