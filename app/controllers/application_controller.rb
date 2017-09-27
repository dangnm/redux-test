class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  DEFAULT_ITEMS_PER_PAGE = 5

  # wrapper for Google api response standard format
  def serializable_resource_wrapper(resource, serializer_klass, scope = {})
    if resource.is_a?(Hash) && serializer_klass.nil?
      parsed_resource = resource
    else
      parsed_resource = serializable_resource(resource, serializer_klass, scope)
    end

    if parsed_resource.is_a?(Hash)
      {
        data: parsed_resource
      }
    else
      {
        data: {
          sort: sort,
          items_per_page: (params[:items_per_page] || DEFAULT_ITEMS_PER_PAGE).to_i,
          page_index: resource.try(:current_page),
          total_pages: resource.try(:total_pages),
          total_items: resource.try(:total_count),
          items: parsed_resource
        }
      }
    end
  end

  # wrapper for Google api response standard format
  def render_errors(errors, status = nil)
    ApiResponseUtils::ValidationErrorRender
      .render_errors(errors, status)
  end

  private

  def sort
    return params[:sort] if params[:sort]
    return params[:sorts].join(',') if params[:sorts].is_a?(Array)
  end

  def serializable_resource(resource, serializer_klass, scope = {})
    if resource.is_a?(ActiveRecord::Relation) || resource.is_a?(::Array)
      serializable_collection_resource(resource, serializer_klass, scope)
    else
      serializable_object_resource(resource, serializer_klass, scope)
    end
  end

  def serializable_collection_resource(collection, serializer_klass, scope = {})
    ActiveModel::SerializableResource.new(
      collection,
      each_serializer: serializer_klass,
      scope: scope
    ).as_json
  end

  def serializable_object_resource(resource, serializer_klass, scope = {})
    ActiveModel::SerializableResource.new(
      resource,
      serializer: serializer_klass,
      scope: scope
    ).as_json
  end
end
