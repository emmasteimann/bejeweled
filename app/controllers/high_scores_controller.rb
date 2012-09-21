class HighScoresController < ApplicationController
  def create
    params[:high_scores][:name] = Sanitize.clean(params[:high_scores][:name])
    params[:high_scores][:score] = session[:score]
    @score = HighScores.new(params[:high_scores])
      respond_to do |format|
        if @score.save
          @high_scores = HighScores.order("score asc").last(5)
          format.js
          true
        else
          false
        end
      end
  end
  def set_session
    session[:score] = nil
    session[:score] = params[:score].to_i
    render :json => session[:score]
  end
end
