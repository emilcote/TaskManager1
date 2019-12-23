require 'test_helper'
class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get admin_users_url
    assert_response :success
  end
  test 'should get edit' do
    user = create(:user)
    get edit_admin_user_url user.id
    assert_response :success
  end

  test 'should get new' do
    get new_admin_user_url
    assert_response :success
  end

  test 'should post create' do
    user = attributes_for(:user)
    assert_difference 'User.count', +1 do
      post admin_users_url, params: { user: user }
    end
  end

  test 'should patch update' do
    user = create(:user)
    user_attrs = attributes_for(:user)
    patch admin_user_url user.id, params: { user: user_attrs }
    user.reload
    assert_not_equal user.slice(*user_attrs.keys), user_attrs
  end

  test 'should delete destroy' do
    user = create(:user)
    assert_difference 'User.count', -1 do
      delete admin_user_url user.id
    end
  end
end
