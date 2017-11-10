FactoryGirl.define do
  factory :admin do
    email Faker::Internet.email
    password '12345678'
    password_confirmation '12345678'
    first_name 'a'
    last_name 'b'
  end
end
