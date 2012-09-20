class HighScores < ActiveRecord::Base
  attr_accessible :name, :score

  validates :name, :presence => true
  validates :score, :presence => true

end
