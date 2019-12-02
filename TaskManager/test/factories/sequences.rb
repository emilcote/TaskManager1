# frozen_string_literal: true

FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end
  sequence(:first_name, aliases: %i[first_name last_name password name description avatar]) do
     |n| "string#{n}"
  end
  sequence :expired_at do
    Time.now + rand(10)
  end
end