# frozen_string_literal: true

class Session
  include ActiveModel::Model

  attr_accessor(
    :email,
    :password
  )

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validates :password, presence: true
  validate :validate_credentials

  def user
    User.find_by(email: email)
  end

  private

  def validate_credentials
    return if user&.authenticate(password)

    errors.add(:email, "email or password doesn't match")
  end
end
