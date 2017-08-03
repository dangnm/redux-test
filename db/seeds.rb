# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "============== Create addmin account ============"

admins = [
  # admin
  {
    email: 'admin@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_1@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_2@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_3@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_3@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_4@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_5@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_6@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_7@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_8@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_9@test.com',
    password: '1234qwer'
  },
  {
    email: 'admin_10@test.com',
    password: '1234qwer'
  },
]

# Admin.destroy_all

admins.each do |admin|
  count = Admin.where(email: admin[:email]).count
  Admin.create(admin) if count == 0
end

(11..30).to_a.each do |i|
  Admin.create({email: "admin_#{i}@test.com", password: '1234qwer'})
end
# if Rails.env == "development"
# end
  

puts "============== Finished to create addmin account ============"
