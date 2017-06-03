import React from 'react';
import './CreateChannel.css'

const handleSubmit = (e) => {
  e.preventDefault()
}

const CreateChannel = () => {
  return (
    <div className="create-channel-wrapper">
      <input className="create-channel-input" type="text" placeholder="Channel Name" />
      <form className="create-channel-form">
        <fieldset>
          <legend>Choose Channel Genres</legend>
            <input type="checkbox" name="genres" value="Hiphop" />Hiphop <br />
            <input type="checkbox" name="genres" value="EDM" />EDM<br />
            <input type="checkbox" name="genres" value="Rock" />Rock<br />
            <input type="checkbox" name="genres" value="All Genres" />All Genres<br />
        </fieldset>
      </form>
      <input onClick={(e) => handleSubmit(e) } type="submit" value="Submit now" />
    </div>
  )
}

export default CreateChannel;
