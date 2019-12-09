# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name
    description
    author { create :user }
    expired_at
  end
end
