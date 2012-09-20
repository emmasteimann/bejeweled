class HighScoresController < ApplicationController
  def create
    params[:high_scores][:name] = Sanitize.clean(params[:high_scores][:name])
    @score = HighScores.new(params[:high_scores])
      respond_to do |format|
        if @score.save
          @high_scores = HighScores.order("score asc").last(5)
          format.js
        end
      end
  end
end
