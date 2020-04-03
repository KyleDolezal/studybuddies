class CreateUserInterests < ActiveRecord::Migration[6.0]
  def change
      create_table :user_interests do |t|
      t.references :user
      t.references :interest
      t.index [:interest_id, :user_id], unique: true

      t.timestamps
    end
  end
end
