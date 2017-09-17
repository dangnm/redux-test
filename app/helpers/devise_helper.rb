module DeviseHelper
  def devise_error_messages!
    return "" unless devise_error_messages?

    parsed_messages = parse_full_error_messages(resource.errors)
    messages = parsed_messages.map { |msg| content_tag(:li, msg) }.join
    sentence = I18n.t("errors.messages.not_saved",
                      :count => resource.errors.count,
                      :resource => resource.class.model_name.human.downcase)

    html = <<-HTML
    <div id="error_explanation">
      <h2>#{sentence}</h2>
      <ul>#{messages}</ul>
    </div>
    HTML

    html.html_safe
  end

  def devise_error_messages?
    !resource.errors.empty?
  end

  private

  def parse_full_error_messages(errors)
    parsed_messages = []
    errors.messages.each do |field, messages|
      messages.each_with_index do |message, index| 
        if message.try(:chr) == '^'
          returned_messsage = errors.full_messages_for(field)[index].split('^', 2).last
        else
          returned_messsage = errors.full_messages_for(field)[index]
        end
        parsed_messages << returned_messsage
      end
    end
    parsed_messages
  end
end
