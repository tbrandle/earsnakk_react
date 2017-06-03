import React from 'react';

const handleSubmit = (e) => {
  e.preventDefault()
}

const CreateChannel = () => {
  return (
    <div>
      <input type="text" placeholder="Channel Name" />

    //  not sure about the fieldset here.... we can structure this differently

      <form>
        <fieldset>
          <legend>Choose Channel Genres</legend>
            <input type="checkbox" name="genres" value="Hiphop" />Hiphop <br />
            <input type="checkbox" name="genres" value="EDM" />EDM<br />
            <input type="checkbox" name="genres" value="Rock" />Rock<br />
            <input type="checkbox" name="genres" value="All Genres" />All Genres<br />
            <input onClick={(e) => handleSubmit(e) } type="submit" value="Submit now" />
        </fieldset>
      </form>
    </div>
  )
}

export default CreateChannel;
