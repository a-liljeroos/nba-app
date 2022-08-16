<br>
See The App Live :<a target="_blank" href="https://a-liljeroos.github.io/nba-app/">HERE</a>.<br>
<br>
<br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
<br>
! Later turned into [Typescript](https://www.typescriptlang.org/).\
<br>


\
HOW IT WORKS??\
\
Search form work logic and order:

<ol>
<li> a user starts typing
</li>
<li> second typed letter triggers <a target="_blank" href="https://www.balldontlie.io/">Balldontlie API</a> call for available names - this runs on every letter typed
</li>
<li> the user picks a player they like from the list
</li>
<li> when the user clicks name from the list that triggers useNavigate redirect to the url based on player ID number
</li>
<li> PlayerInfo.tsx takes the ID and makes a call to another balldontlie API endpoint for the player data and 2nd call to <a target="_blank" href="https://www.deta.sh/" >DETA CLOUD</a> FastAPI for the image.
</li>

</ol><br>
<br>

FEATURES:
<br>

<ul>
<li> Two different themes on the landing page.
</li>
<li>  An input validator that uses regex.
</li>
<li> React-router-dom is used for navigations.
</li>
</ul>


