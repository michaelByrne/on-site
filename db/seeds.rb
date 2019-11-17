# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

Property.destroy_all

uri = open('https://data.seattle.gov/resource/kppy-esfu.json')

dat = JSON.parse(uri.read)

dat.each do |p|
  if p["location_1"] && p["location_1"]["latitude"] && p["location_1"]["longitude"]
    prop = Property.new
    prop.name = p["pma_name"]
    prop.lat = p["location_1"]["latitude"]
    prop.long = p["location_1"]["longitude"]
    prop.org = p["name"]
    prop.use = p["use"]
    prop.save!
  end  
end

# we need to get rid of any geographical duplicates 
Property.dedupe





