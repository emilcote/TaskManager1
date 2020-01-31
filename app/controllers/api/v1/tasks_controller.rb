class Api::V1::TasksController < Api::V1::ApplicationController
  def index
    q_params = params[:q] || { s: 'id asc' }

    tasks = current_user.my_tasks
            .ransack(q_params)
            .result
            .page(params[:page])
            .per(params[:per_page])

    json = {
      items: tasks.map { |t| TaskSerializer.new(t).as_json },
      meta: build_meta_tasks(tasks)
    }

    respond_with json
  end

  def show
    task = Task.find(params[:id])
    respond_with(task)
  end

  def create
    task = current_user.my_tasks.create(task_params)
    respond_with(task, location: nil)
  end

  def update
    task = current_user.my_tasks.find(params[:id])
    task.update(task_params)
    respond_with(task)
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    respond_with(task)
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :author_id, :assignee_id, :state_event)
  end
end
