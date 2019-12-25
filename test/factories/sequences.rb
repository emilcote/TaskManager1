# frozen_string_literal: true

FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end
  sequence(:first_name, aliases: %i[last_name password name string description avatar]) do |n|
    "string#{n}"
  end
  sequence :expired_at do
    Time.now.utc + rand(10)
  end
end
