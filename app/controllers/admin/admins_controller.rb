class Admin::AdminsController < ApplicationController
  def index
    @admins = Admin.page(params[:page]).per(5)

    respond_to do |format|
      format.json  {
        render :json => {
                 data: {
                   items_per_page: 3,
                   page_index: params[:page] || 1,
                   total_pages: @admins.total_pages,
                   total_items: @admins.count,
                   items: @admins
                 }
               }
      }
    end
  end
end
