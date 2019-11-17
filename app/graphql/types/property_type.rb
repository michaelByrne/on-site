module Types
  class PropertyType < Types::BaseObject
    field :name, String, null: false
    field :lat, String, null: true
    field :long, String, null: true
    field :use, String, null: true
    field :org, String, null: true
  end
end