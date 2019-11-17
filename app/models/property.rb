class Property < ApplicationRecord
  def self.dedupe
    # find all models and group them on keys which should be common
    grouped = all.group_by{|model| [model.lat,model.long] }
    grouped.values.each do |duplicates|
      # keep the first one
      first_one = duplicates.shift 
      duplicates.each{|double| double.destroy}
    end
  end
end