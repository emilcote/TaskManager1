# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name { 'MyString' }
    description { 'MyText' }
    author_id { '' }
    assignee_id { '' }
    state { 'MyString' }
    expired_at { '2019-11-28' }
  end
end
