class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :created_at, :updated_at

  def created_at
    object.created_at.to_i
  end

  def updated_at
    object.updated_at.to_i
  end
end
