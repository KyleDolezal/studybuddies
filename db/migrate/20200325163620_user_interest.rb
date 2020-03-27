class UserInterest < ActiveRecord::Migration[6.0]
  def change
    create_table :user_interests do |t|
      t.references :user
      t.references :interest

      t.timestamps
    end

    add_index(:user_interests, [:interest_id, :user_id], unique: true)
  end
end
