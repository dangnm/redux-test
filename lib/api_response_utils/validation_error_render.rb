module ApiResponseUtils
  module ValidationErrorRender
    class << self
      # wrapper for Google api response standard format
      def render_errors(errors, status = nil)
        if errors.is_a?(ActiveModel::Errors)
          render_validation_error(errors, status)
        else
          render_generic_error(errors, status)
        end
      end

      private

      def render_validation_error(errors, status)
        error_objects = []
        errors.details.each do |field, details|
          default_error_index = find_index_of_duplicated_default_error(errors, field)
          details.each_with_index do |detail, index|
            if default_error_index != index
              error_objects << {
                reason: detail[:error],
                message: parse_validation_message(errors, field, index),
                location: field,
                location_type: :field
              }
            end
          end
        end
        { code: status, error: { errors: error_objects } }
      end

      def parse_validation_message(errors, field, index)
        if errors.messages[field][index].try(:chr) == '^'
          return errors.full_messages_for(field)[index].split('^', 2).last
        end
        errors.full_messages_for(field)[index]
      end

      def find_index_of_duplicated_default_error(errors, field)
        if errors.messages[field].size > 1
          field_messages = errors.messages[field]
          field_index = field_messages.index { |message| message == "is invalid" }
          return field_index
        end
        nil
      end

      def render_generic_error(error, status)
        error_objects =
          if error.is_a?(Exception)
            exception_error_objects(error)
          else
            Array(error).map { |msg| { message: msg } }
          end
        { code: status, error: { errors: error_objects } }
      end

      def exception_error_objects(error)
        object = {
          message: error.message,
          reason: error.class.name
        }
        unless Rails.env.production?
          object[:location] = error.backtrace
          object[:location_type] = :backtrace
        end
        [object]
      end
    end
  end
end
