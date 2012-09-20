class WhoGameController < ApplicationController
  def index
    @high_scores = HighScores.order("score asc").last(5)

    respond_to do |format|
      format.html # index.html.erb
    end
  end
end
