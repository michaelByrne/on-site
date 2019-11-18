module Types
  class QueryType < Types::BaseObject

    field :all_properties, [PropertyType], null: false,
      description: "An example field added by the generator"

    def all_properties
      Property.all
    end
  end
end
