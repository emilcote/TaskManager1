# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'web/board#show'

  scope module: :web do
    resource :board, only: :show
    resource :session, only: %i[new create destroy]
  end
end
