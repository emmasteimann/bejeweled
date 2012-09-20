class HighScores < ActiveRecord::Base
  attr_accessible :name, :score

  validates :name, :presence => true
  validates :score, :presence => true
  validates_uniqueness_of :name, :scope => [:score]

end
