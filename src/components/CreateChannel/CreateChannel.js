import React from 'react';

const newStation = () => {
  console.log('clicked');
  fetch('/api/v1/playlist')
    .then(response => console.log(response))
}

const CreateChannel = () => {
  return (
    <div>
      <input type="text" placeholder="Channel Name" />

    //  not sure about the fieldset here.... we can structure this differently

      <fieldset>
        <legend>Choose Channel Genres</legend>
        <div>
          <input type="checkbox" id="hiphop" name="interest" value="hiphop"/>
          <label for="hiphop">Hip-hop</label>
        </div>
        <div>
          <input type="checkbox" id="edm" name="interest" value="edm"/>
          <label for="edm">EDM</label>
        </div>
        <div>
          <input type="checkbox" id="house" name="interest" value="house"/>
          <label for="house">House</label>
        </div>
        <div>
          <input type="checkbox" id="rock" name="interest" value="rock"/>
          <label for="rock">Rock</label>
        </div>
        <div>
          <input type="checkbox" id="all-genres" name="interest" value="all-genres"/>
          <label for="all-genres">All Genres Allowed</label>
        </div>
      </fieldset>
      <button onClick={ () => newStation() }>createTEST</button>
    </div>
  )
}

export default CreateChannel;
