class CreateInterests < ActiveRecord::Migration[6.0]
  def change
    create_table :interests do |t|
      t.string :title

      t.index :title, unique: true

      t.timestamps
    end
  end
end
