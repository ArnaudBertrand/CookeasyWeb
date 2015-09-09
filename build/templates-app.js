angular.module('templates-app', ['game/create/create-quiz.tpl.html', 'game/display/display-quiz.tpl.html', 'game/search/search.tpl.html', 'layout/connexion/connexion.tpl.html', 'layout/header/header.tpl.html', 'layout/menu-left/menu-left.tpl.html', 'login/login.tpl.html', 'profile/edit/edit.tpl.html', 'profile/view/view.tpl.html', 'recipe/create/create.tpl.html', 'recipe/display/display.tpl.html', 'recipe/search/search.tpl.html', 'register/register.tpl.html', 'widgets/modal-gallery/modal-gallery.tpl.html', 'widgets/picture-upload/picture-upload.tpl.html', 'widgets/step-line/step-line.tpl.html', 'widgets/user-activities/user-activities.tpl.html']);

angular.module("game/create/create-quiz.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("game/create/create-quiz.tpl.html",
    "<div class=\"container create-quiz\">\n" +
    "\n" +
    "  <!-- Navigation -->\n" +
    "  <div class=\"navigation\" ng-hide=\"quizCreate.infoPage\">\n" +
    "    <step-line graph=\"quizCreate.lineGraph\"\n" +
    "               steps=\"quizCreate.questionsInfos\"\n" +
    "               current=\"quizCreate.qNb\"\n" +
    "               step-clicked=\"quizCreate.goTo\"></step-line>\n" +
    "    <button class=\"btn btn-submit\">\n" +
    "      <i class=\"fa fa-trash-o pointer-on\" ng-click=\"quizCreate.deleteQuestion()\"> Delete</i>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Infos -->\n" +
    "  <div ng-show=\"quizCreate.infoPage\" class=\"info-page input-fw\">\n" +
    "    <h2 class=\"title\">Create a Quiz</h2>\n" +
    "    <p>Set a title for you quiz:</p>\n" +
    "    <input type=\"text\" class=\"input\" ng-model=\"quizCreate.quiz.title\" placeholder=\"Quiz title\" />\n" +
    "    <p>Main picture of your quiz:</p>\n" +
    "    <picture-upload image-uploaded=\"quizCreate.quiz.picture\" target-url=\"quizCreate.pictureUrl\"\n" +
    "                    target-tags=\"quizCreate.pictureInfoTags\"\n" +
    "                    callback=\"quizCreate.setUploadedPictureInfo\"></picture-upload>\n" +
    "    <button class=\"btn btn-submit\" ng-disabled=\"quizCreate.quiz.title.length < 5\"\n" +
    "            ng-click=\"quizCreate.nextQuestion()\">Create questions</button>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Questions -->\n" +
    "  <div class=\"questions input-fw\" ng-hide=\"quizCreate.infoPage\">\n" +
    "    <div class=\"title\">\n" +
    "      <label>\n" +
    "        Your question:\n" +
    "        <input type=\"text\" class=\"input\" ng-model=\"quizCreate.currentQuestion.title\" placeholder=\"Type your question here\"/>\n" +
    "      </label>\n" +
    "      <span class=\"error-details\">{{quizCreate.errors.title}}</span>\n" +
    "    </div>\n" +
    "    <div class=\"answer-type\">\n" +
    "      <p>Answer type:</p>\n" +
    "      <label>\n" +
    "        <input type=\"radio\" ng-model=\"quizCreate.currentQuestion.type\" value=\"text\"\n" +
    "               ng-click=\"quizCreate.resetAnswer()\" />\n" +
    "        Text\n" +
    "      </label>\n" +
    "      <label>\n" +
    "        <input type=\"radio\" ng-model=\"quizCreate.currentQuestion.type\" value=\"images\"\n" +
    "               ng-click=\"quizCreate.resetAnswer()\" />\n" +
    "        Images\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Answers -->\n" +
    "    <div class=\"answers\">\n" +
    "      <!-- Text -->\n" +
    "      <div class=\"text\" ng-if=\"quizCreate.currentQuestion.type === 'text'\">\n" +
    "        <ul class=\"list\">\n" +
    "          <li ng-repeat=\"answer in quizCreate.currentQuestion.answers\">\n" +
    "            <i class=\"fa\" ng-class=\"{'fa-check': answer.correct,'fa-close': !answer.correct}\"></i> {{answer.text}}\n" +
    "            <i class=\"fa fa-minus-square-o\" ng-click=\"quizCreate.deleteAnswer($index)\"></i>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <div class=\"add-answer\">\n" +
    "          <h3>Add answers</h3>\n" +
    "          <input type=\"text\" class=\"input\" placeholder=\"Answer\" ng-model=\"quizCreate.currentAnswer.text\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <!-- Images -->\n" +
    "      <div class=\"images\" ng-if=\"quizCreate.currentQuestion.type === 'images'\">\n" +
    "        <!-- Images answers -->\n" +
    "        <div masonry>\n" +
    "          <div class=\"masonry-brick masonry-nb-2 t-normal\" ng-repeat=\"answer in quizCreate.currentQuestion.answers\">\n" +
    "            <img ng-src=\"{{answer.picture.public_id | formatImg:220:150}}\" alt=\"answer.text\" />\n" +
    "            <div class=\"recipe-title\">\n" +
    "              <h2>{{answer.text}}</h2>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"add-answer input-fw\">\n" +
    "          <input type=\"text\" class=\"input\" placeholder=\"Text on picture (optional)\"\n" +
    "                 ng-model=\"quizCreate.currentAnswer.text\" />\n" +
    "          <picture-upload image-uploaded=\"quizCreate.currentAnswer.picture\" target-url=\"quizCreate.pictureUrl\"\n" +
    "                          target-tags=\"quizCreate.pictureAnswerTags\"\n" +
    "                          callback=\"quizCreate.setUploadedPictureAnswer\"></picture-upload>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <span class=\"error-details\">{{quizCreate.errors.answers}}</span>\n" +
    "      <div class=\"answer-veracity\">\n" +
    "        <i class=\"fa fa-close fa-2x pointer-on\" ng-click=\"quizCreate.addAnswer(false)\"> Uncorrect</i>\n" +
    "        <i class=\"fa fa-check fa-2x pointer-on\" ng-click=\"quizCreate.addAnswer(true)\"> Correct</i>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"submits\">\n" +
    "      <button class=\"btn btn-submit w-half\" ng-click=\"quizCreate.nextQuestion()\">Next question</button>\n" +
    "      <button class=\"btn btn-submit w-half\" ng-click=\"quizCreate.createGame()\">Finish quiz</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("game/display/display-quiz.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("game/display/display-quiz.tpl.html",
    "<div class=\"container display-quiz\">\n" +
    "  <div class=\"quiz\" ng-hide=\"quizDisplay.endOfQuiz\">\n" +
    "    <!-- Progress -->\n" +
    "    <progress ng-value=\"quizDisplay.getProgress()\"></progress>\n" +
    "    <!-- Quiz title + like -->\n" +
    "    <h1>{{quizDisplay.quiz.title}}</h1>\n" +
    "\n" +
    "    <!-- Info -->\n" +
    "    <div class=\"info\">\n" +
    "      Author: {{quizDisplay.quiz.author.username}} - Your score: <i class=\"fa fa-star t-slow\"></i> {{quizDisplay.score}}\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h3  class=\"question-title\">Question: {{quizDisplay.currentQuestion.title}}</h3>\n" +
    "\n" +
    "    <div class=\"list\">\n" +
    "      <!-- Text answers -->\n" +
    "      <label class=\"answer\" ng-repeat=\"answer in quizDisplay.currentQuestion.answers\"\n" +
    "             ng-if=\"quizDisplay.currentQuestion.type === 'text'\">\n" +
    "        <input type=\"radio\" ng-model=\"quizDisplay.currentQuestion.answer\"\n" +
    "               ng-if=\"!quizDisplay.isMultiAnswer()\" ng-value=\"answer.text\"\n" +
    "               ng-click=\"quizDisplay.validateAnswer()\" />\n" +
    "        <input type=\"checkbox\" ng-model=\"answer.checked\" ng-if=\"quizDisplay.isMultiAnswer()\"/>\n" +
    "        {{answer.text}}\n" +
    "      </label>\n" +
    "\n" +
    "      <!-- Images answers -->\n" +
    "      <div masonry>\n" +
    "        <div class=\"masonry-brick masonry-nb-2 t-normal\" ng-repeat=\"answer in quizDisplay.currentQuestion.answers\"\n" +
    "             ng-if=\"quizDisplay.currentQuestion.type === 'images'\" ng-click=\"quizDisplay.onClickAnswer(answer)\">\n" +
    "          <div ng-class=\"{'hide-answer': answer.clicked}\"></div>\n" +
    "          <img ng-src=\"{{answer.picture.public_id | formatImg:220:150}}\" alt=\"answer.text\" />\n" +
    "          <div class=\"recipe-title\">\n" +
    "            <h2>{{answer.text}}</h2>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- Submit button-->\n" +
    "    <button class=\"btn btn-submit\" ng-if=\"quizDisplay.isMultiAnswer()\" ng-click=\"quizDisplay.validateAnswer()\">\n" +
    "      Submit\n" +
    "    </button>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Quiz finished info -->\n" +
    "  <div class=\"quiz-finished\" ng-show=\"quizDisplay.endOfQuiz\">\n" +
    "    <h1><i class=\"fa fa-star t-slow\"></i> Quiz finished <i class=\"fa fa-star t-slow\"></i></h1>\n" +
    "\n" +
    "    <!-- Stats -->\n" +
    "    <div class=\"stats\">\n" +
    "      <h3 class=\"list-title\">Stats</h3>\n" +
    "      <ul class=\"list\">\n" +
    "        <li>Final score: {{quizDisplay.score}}</li>\n" +
    "        <li>{{quizDisplay.quiz.questions.length}} questions answered</li>\n" +
    "        <li>{{quizDisplay.nbMistake}} mistakes</li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <h3>Your new score is now: {{quizDisplay.totalScore}}</h3>\n" +
    "\n" +
    "    <!-- Like -->\n" +
    "    <p ng-hide=\"quizDisplay.liked\">\n" +
    "      Enjoyed that quiz?\n" +
    "      <span class=\"pointer-on\" ng-click=\"quizDisplay.like()\">\n" +
    "        Like it\n" +
    "        <i class=\"fa fa-heart\"></i>\n" +
    "      </span>\n" +
    "    </p>\n" +
    "    <p ng-show=\"quizDisplay.liked\">\n" +
    "      Thanks !\n" +
    "    </p>\n" +
    "\n" +
    "    <!-- Menu -->\n" +
    "    <button class=\"btn btn-submit pointer-on\" ng-click=\"quizDisplay.retry()\">\n" +
    "      <i class=\"fa fa-repeat\"></i> Retry\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-submit pointer-on\" ng-click=\"quizDisplay.goToSearch()\">\n" +
    "      <i class=\"fa fa-bars\"></i> Search Quiz\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("game/search/search.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("game/search/search.tpl.html",
    "<div class=\"game-search\">\n" +
    "  <div class=\"top input-fw\">\n" +
    "    <input type=\"text\" class=\"input\" ng-model=\"gameSearch.gameToSearch\" ng-change=\"gameSearch.search()\"\n" +
    "           ng-model-options=\"{ debounce: 500 }\" placeholder=\"Search for a game\" />\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"game pointer-on\" ng-repeat=\"game in gameSearch.games\" ng-click=\"gameSearch.displayGame(game)\">\n" +
    "    <div class=\"logo\">\n" +
    "      <img ng-if=\"game.picture\" ng-src=\"{{ game.picture.public_id | formatImg }}\" alt=\"game.title\" />\n" +
    "      <img ng-if=\"!game.picture\" src=\"assets/images/quiz.png\" alt=\"game.title\" />\n" +
    "    </div>\n" +
    "    <div class=\"info\">\n" +
    "      <h3>{{game.title}}</h3>\n" +
    "      <p class=\"nb-like\">\n" +
    "        {{game.likes.length}} <i class=\"fa fa-heart\"></i>\n" +
    "      </p>\n" +
    "      <p>by {{game.author.username}} on {{game.updatedOn | date}}</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("layout/connexion/connexion.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("layout/connexion/connexion.tpl.html",
    "<li ng-if=\"!connexion.userConnected\" class=\"menu-item\">\n" +
    "  <a class=\"menu-item-btn\" ng-click=\"connexion.login()\" ng-class=\"{'active': connexion.active === 'login'}\">\n" +
    "    <span>Login</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-if=\"!connexion.userConnected\" class=\"menu-item\">\n" +
    "  <a class=\"menu-item-btn\" ng-click=\"connexion.register()\" ng-class=\"{'active': connexion.active === 'register'}\">\n" +
    "    <span>Signup</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-if=\"connexion.userConnected\" class=\"menu-item user-connected\" ng-click=\"connexion.toggleUser()\">\n" +
    "  <img ng-if=\"connexion.userConnected.picture\" ng-src=\"{{connexion.userConnected.picture.public_id | formatImg:50:50}}\"\n" +
    "       class=\"pointer-on\" />\n" +
    "  <img ng-if=\"!connexion.userConnected.picture\" src=\"assets/images/user-default.png\" class=\"pointer-on\" />\n" +
    "\n" +
    "  <i class=\"fa fa-caret-down fa-2x t-normal pointer-on\" ng-class=\"{'r-180': connexion.userInfo}\"></i>\n" +
    "  <div class=\"user-info\" ng-show=\"connexion.userInfo\">\n" +
    "    <h3>{{connexion.userConnected.username}}</h3>\n" +
    "    <ul>\n" +
    "      <li ng-click=\"connexion.profile()\">\n" +
    "        <i class=\"fa fa-user fa-2x pointer-on\"></i>\n" +
    "        Profile\n" +
    "      </li>\n" +
    "      <li ng-click=\"connexion.logout()\">\n" +
    "        <i class=\"fa fa-sign-out fa-2x pointer-on\"></i>\n" +
    "        Logout\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("layout/header/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("layout/header/header.tpl.html",
    "<header>\n" +
    "  <nav>\n" +
    "    <div class=\"logo\">\n" +
    "      <a ui-sref=\"recipeSearch\">\n" +
    "        <h1 class=\"title\">COOKEASY</h1>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <ul>\n" +
    "      <li class=\"menu-item\">\n" +
    "        <a ui-sref=\"recipeSearch\" class=\"menu-item-btn\" ng-class=\"{'active': ceHeader.active === 'recipe'}\">\n" +
    "          <span>Recipes</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li class=\"menu-item\">\n" +
    "        <a ui-sref=\"gameSearch\" class=\"menu-item-btn\" ng-class=\"{'active': ceHeader.active === 'game'}\">\n" +
    "          <span>Learning Games</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <ce-connexion active=\"ceHeader.active\"></ce-connexion>\n" +
    "    </ul>\n" +
    "  </nav>\n" +
    "</header>\n" +
    "");
}]);

angular.module("layout/menu-left/menu-left.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("layout/menu-left/menu-left.tpl.html",
    "<nav class=\"menu-left\" ng-class=\"{'menu-left-open': menuLeft.opened}\">\n" +
    "  <div class=\"menu-left-content\">\n" +
    "    <h3>Menu</h3>\n" +
    "    <a href ng-click=\"menuLeft.toggleDisplay()\" ui-sref=\"recipeSearch\">Search recipes</a>\n" +
    "    <a href ng-click=\"menuLeft.goToCreateRecipe()\">Create a recipe</a>\n" +
    "    <a href ng-click=\"menuLeft.goToSearchGame()\">Game learning</a>\n" +
    "    <a href ng-click=\"menuLeft.goToCreateGame()\">Create a game</a>\n" +
    "    <a href ng-click=\"menuLeft.goToProfile()\">My profile</a>\n" +
    "  </div><div class=\"menu-left-toggle pointer-on\" ng-click=\"menuLeft.toggleDisplay()\">\n" +
    "    <i class=\"fa fa-chevron-right fa-2x t-normal\" ng-class=\"{'r-180': menuLeft.opened}\"></i>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div class=\"login\">\n" +
    "  <h2>Connexion</h2>\n" +
    "  <form name=\"loginForm\" ng-submit=\"login.login()\" role=\"form\" class=\"input-fw\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Username or E-mail\n" +
    "        <input type=\"text\" name=\"userId\" class=\"input\" ng-model=\"login.user.id\"\n" +
    "               placeholder=\"Enter your username or you e-mail\" required />\n" +
    "      </label>\n" +
    "      <span ng-show=\"loginForm.userId.$dirty && loginForm.userId.$error.required\" class=\"help-block\">\n" +
    "        Username or E-mail is required\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Password\n" +
    "        <input type=\"password\" name=\"password\" class=\"input\" ng-model=\"login.user.password\" ng-minlength=\"6\"\n" +
    "               placeholder=\"Enter your password\" required />\n" +
    "      </label>\n" +
    "      <span ng-show=\"loginForm.password.$dirty && loginForm.password.$error.required\" class=\"help-block\">\n" +
    "        Password is required\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <div class=\"form-actions\">\n" +
    "      <span ng-show=\"login.error\" class=\"alert alert-danger\">{{login.error}}</span>\n" +
    "      <button ng-type=\"submit\" ng-disabled=\"loginForm.$invalid || dataLoading\" class=\"btn btn-submit\">\n" +
    "        Login\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <a href ui-sref=\"register\">Need an account? Sign up</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/edit/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/edit/edit.tpl.html",
    "<div class=\"edit-profile\">\n" +
    "  <aside>\n" +
    "    <div class=\"profile-picture\">\n" +
    "      <img ng-if=\"profEdit.profile.picture\" ng-src=\"{{profEdit.profile.picture.public_id | formatImg:200:200 }}\" />\n" +
    "      <img ng-if=\"!profEdit.profile.picture\" src=\"assets/images/user-default.png\" alt=\"game.title\" />\n" +
    "    </div>\n" +
    "    <div class=\"input-fw\">\n" +
    "      <button class=\"btn bg-valid pointer-on\" ng-click=\"profEdit.edit()\">Save</button>\n" +
    "      <button class=\"btn bg-cancel pointer-on\" ui-sref=\"profileView({username: profEdit.profile.username})\">Cancel</button>\n" +
    "    </div>\n" +
    "  </aside>\n" +
    "  <div class=\"profile-info input-fw\">\n" +
    "    <h2>{{profEdit.profile.username}}</h2>\n" +
    "    <hr />\n" +
    "    Full name:\n" +
    "    <input type=\"text\" ng-model=\"profEdit.profile.name\" class=\"input\" />\n" +
    "    Date of birth:\n" +
    "    <input type=\"date\" ng-model=\"profEdit.dobFormatted\" class=\"input\" />\n" +
    "    Location:\n" +
    "    <input type=\"text\" ng-model=\"profEdit.profile.location\" class=\"input\" />\n" +
    "    Description\n" +
    "    <textarea class=\"input\" ng-model=\"profEdit.profile.description\"></textarea>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/view/view.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/view/view.tpl.html",
    "<div class=\"edit-profile\">\n" +
    "  <aside>\n" +
    "    <div class=\"profile-picture pointer-on\" ng-click=\"profView.showProfilePicture()\">\n" +
    "      <img ng-if=\"profView.profile.picture\" ng-src=\"{{profView.profile.picture.public_id | formatImg:200:200 }}\" />\n" +
    "      <img ng-if=\"!profView.profile.picture\" src=\"assets/images/user-default.png\" alt=\"game.title\" />\n" +
    "    </div>\n" +
    "    <div class=\"input-fw\" ng-if=\"profView.isProfile()\">\n" +
    "      <button class=\"btn pointer-on\" ui-sref=\"profileEdit({username: profView.profile.username})\">Edit profile</button>\n" +
    "    </div>\n" +
    "  </aside>\n" +
    "  <div class=\"profile-info\">\n" +
    "    <h2>{{profView.profile.username}}</h2>\n" +
    "    <hr />\n" +
    "    <p>{{profView.profile.description}}</p>\n" +
    "    <p ng-if=\"!profView.profile.description\">This user hasn't completed his description.</p>\n" +
    "    <hr />\n" +
    "    <p>\n" +
    "      <span ng-show=\"profView.profile.dob\">{{profView.profile.dob | ageFromDob}} Ans</span>\n" +
    "      <span ng-show=\"profView.profile.location\"><i class=\"fa fa-map-marker\"></i> {{profView.profile.location}}</span>\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"recent-activity\">\n" +
    "      <h3>Recent activity</h3>\n" +
    "      <user-activities user-picture=\"profView.profile.picture.public_id\" activities=\"profView.profile.activities\"></user-activities>\n" +
    "      <p ng-if=\"!profView.profile.activities.length\">No recent activities.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("recipe/create/create.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("recipe/create/create.tpl.html",
    "<div class=\"container create-recipe\">\n" +
    "  <step-line graph=\"rcpCreate.lineGraph\" steps=\"rcpCreate.stepsInfo\"\n" +
    "             current=\"rcpCreate.currentStep.number\"\n" +
    "             step-clicked=\"rcpCreate.goTo\"\n" +
    "             ng-hide=\"rcpCreate.stepInformation\"></step-line>\n" +
    "  <!-- Recipe information -->\n" +
    "  <div ng-show=\"rcpCreate.stepInformation\">\n" +
    "    <h2 class=\"title\">Create a recipe</h2>\n" +
    "    <div class=\"recipe-title\">\n" +
    "      <label>\n" +
    "        Recipe name\n" +
    "        <input type=\"text\" ng-class=\"{'input-error' : rcpCreate.errors.name}\" ng-model=\"rcpCreate.recipe.name\"\n" +
    "               placeholder=\"Enter the name of your recipe\" />\n" +
    "      </label>\n" +
    "      <br /><span class=\"error-details\">{{rcpCreate.errors.name}}</span>\n" +
    "    </div>\n" +
    "    <p>\n" +
    "      This is a dish for\n" +
    "      <input type=\"number\" min=\"1\" class=\"input top-input\" placeholder=\"Nb\" ng-model=\"rcpCreate.recipe.nbPerson\"\n" +
    "             ng-class=\"{'input-error': rcpCreate.errors.nbPerson}\" /> persons\n" +
    "      and take\n" +
    "      <input type=\"number\" min=\"1\" class=\"input top-input\" placeholder=\"Nb\" ng-model=\"rcpCreate.recipe.time\"\n" +
    "             ng-class=\"{'input-error': rcpCreate.errors.time}\" /> mins to cook.\n" +
    "      <br /><span class=\"error-details\">{{rcpCreate.errors.nbPerson}} {{rcpCreate.errors.time}}</span>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Course:\n" +
    "      <select ng-model=\"rcpCreate.recipe.course\" class=\"input\" ng-class=\"{'input-error': rcpCreate.errors.course}\"\n" +
    "              ng-options=\"course.name for course in rcpCreate.courses\">\n" +
    "        <option value=\"\">Pick a course</option>\n" +
    "      </select>\n" +
    "      <br /><span class=\"error-details\">{{rcpCreate.errors.course}}</span>\n" +
    "    </p>\n" +
    "    <p>Difficulty:\n" +
    "      <input type=\"number\" min=\"1\" max=\"5\" class=\"input\" ng-model=\"rcpCreate.recipe.difficulty\"\n" +
    "             ng-class=\"{'input-error': rcpCreate.errors.difficulty}\" />\n" +
    "      <span class=\"info\">(Between 1 and 5)</span>\n" +
    "      <br /><span class=\"error-details\">{{rcpCreate.errors.difficulty}}</span>\n" +
    "    </p>\n" +
    "    <div class=\"ingredients\">\n" +
    "      <h3 class=\"list-title\">Ingredients</h3>\n" +
    "      <span class=\"error-details\">{{rcpCreate.errors.ingredients}}</span>\n" +
    "      <ul class=\"list\">\n" +
    "        <li ng-repeat=\"ingredient in rcpCreate.recipe.ingredients\">\n" +
    "          {{ingredient.qte}} <span ng-show=\"ingredient.unit\">{{ingredient.unit }} of </span>{{ingredient.name}}\n" +
    "          <a ng-click=\"rcpCreate.deleteIngredient($index)\"> (remove)</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <div class=\"list-add\">\n" +
    "        <input type=\"text\" class=\"input name\" placeholder=\"Name\" ng-model=\"rcpCreate.currentIngredient.name\"\n" +
    "               ng-class=\"{'input-error': rcpCreate.errors.ingredient.name}\" />\n" +
    "        <input type=\"number\" class=\"input\" min=\"0\" placeholder=\"Quantity\" ng-model=\"rcpCreate.currentIngredient.qte\"\n" +
    "               ng-class=\"{'input-error': rcpCreate.errors.ingredient.qte}\" />\n" +
    "        <input type=\"text\" class=\"input\" placeholder=\"Unit\" ng-model=\"rcpCreate.currentIngredient.unit\"\n" +
    "               ng-class=\"{'input-error': rcpCreate.errors.ingredient.unit}\" />\n" +
    "        <button ng-click=\"rcpCreate.addIngredient()\" class=\"btn bg-primary\">+</button>\n" +
    "      </div>\n" +
    "      <span class=\"error-details\">\n" +
    "        {{rcpCreate.errors.ingredient.name}} {{rcpCreate.errors.ingredient.qte}} {{rcpCreate.errors.ingredient.unit}}\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <div class=\"utensils\">\n" +
    "      <h3 class=\"list-title\">Utensils required</h3>\n" +
    "      <ul class=\"list\">\n" +
    "        <li ng-repeat=\"utensil in rcpCreate.recipe.utensils\">\n" +
    "          {{ utensil }}\n" +
    "          <a ng-click=\"rcpCreate.deleteUtensil($index)\"> (remove)</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <div class=\"list-add\">\n" +
    "        <input type=\"text\" class=\"input\" placeholder=\"Name\" ng-model=\"rcpCreate.currentUtensil\" />\n" +
    "        <button ng-click=\"rcpCreate.addUtensil()\" class=\"btn bg-primary\">+</button>\n" +
    "      </div>\n" +
    "      <span class=\"error-details\">{{rcpCreate.errors.utensil}}</span>\n" +
    "    </div>\n" +
    "    <div class=\"next-step\">\n" +
    "      <button class=\"bg-primary\" ng-click=\"rcpCreate.nextStep()\">Next</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Recipe steps -->\n" +
    "  <div ng-show=\"rcpCreate.stepCreations\">\n" +
    "    <div class=\"previous\" ng-click=\"rcpCreate.previousStep()\">\n" +
    "      <i class=\"fa fa-chevron-circle-left fa-5x\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"step\">\n" +
    "      <h2 class=\"title\">Step {{rcpCreate.currentStep.number}}</h2>\n" +
    "      <div class=\"timer\">\n" +
    "        <i class=\"fa fa-clock-o\"></i>\n" +
    "        <a ng-hide=\"rcpCreate.showTimer\" ng-click=\"rcpCreate.toggleTimer()\">\n" +
    "          Add timer\n" +
    "        </a>\n" +
    "        <span ng-show=\"rcpCreate.showTimer\" >\n" +
    "          <input type=\"number\" ng-model=\"rcpCreate.currentStep.time\" min=\"0\" placeholder=\"Number of minutes\" />\n" +
    "          <a ng-click=\"rcpCreate.toggleTimer()\">\n" +
    "            Remove timer\n" +
    "          </a>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <span class=\"error-details\">{{rcpCreate.errors.step.action}}{{rcpCreate.errors.step.time}}</span>\n" +
    "      <div class=\"action\">\n" +
    "        <textarea ng-model=\"rcpCreate.currentStep.action\" placeholder=\"To do...\"></textarea>\n" +
    "      </div>\n" +
    "      <picture-upload image-uploaded=\"rcpCreate.currentStep.picture\" target-url=\"rcpCreate.pictureUrl\"\n" +
    "                      target-tags=\"rcpCreate.pictureStepTags\" callback=\"rcpCreate.setUploadedPicture\">\n" +
    "      </picture-upload>\n" +
    "      <div class=\"next-step\">\n" +
    "        <button class=\"bg-primary\" ng-click=\"rcpCreate.deleteStep()\">Delete</button>\n" +
    "        <button class=\"bg-primary\" ng-click=\"rcpCreate.lastStep()\">Terminate</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"next\">\n" +
    "      <i class=\"fa fa-chevron-circle-right fa-5x\" ng-click=\"rcpCreate.nextStep()\"></i>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Final step -->\n" +
    "  <div ng-show=\"rcpCreate.stepFinal\" class=\"final-step\">\n" +
    "    <h2>Upload the main picture of your recipe</h2>\n" +
    "    <picture-upload image-uploaded=\"rcpCreate.recipe.picture\" target-url=\"rcpCreate.pictureUrl\"\n" +
    "                    target-tags=\"rcpCreate.pictureFinalTags\" callback=\"rcpCreate.setUploadedPicture\">\n" +
    "    </picture-upload>\n" +
    "    <button class=\"btn btn-submit\" ng-disabled=\"!rcpCreate.recipe.picture\"\n" +
    "            ng-click=\"rcpCreate.createRecipe()\">Submit your recipe !</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("recipe/display/display.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("recipe/display/display.tpl.html",
    "<div class=\"container display-recipe\">\n" +
    "  <!-- Step selector -->\n" +
    "  <step-line graph=\"rcpDisplay.lineGraph\" steps=\"rcpDisplay.stepsInfo\"\n" +
    "    ng-hide=\"rcpDisplay.showInfoPage\" current=\"rcpDisplay.currentStep.number\"\n" +
    "    step-clicked=\"rcpDisplay.goTo\"></step-line>\n" +
    "\n" +
    "  <!-- Informations -->\n" +
    "  <div ng-show=\"rcpDisplay.showInfoPage\">\n" +
    "    <h1>{{rcpDisplay.recipe.name}}</h1>\n" +
    "    <div class=\"recipe-info\">\n" +
    "      <span class=\"difficulty\">\n" +
    "        Difficulty:\n" +
    "        <i ng-repeat=\"t in [] | range: rcpDisplay.recipe.difficulty\" class=\"fa fa-star\">\n" +
    "        </i><i ng-repeat=\"t in [] | range: (5-rcpDisplay.recipe.difficulty)\" class=\"fa fa-star-o\"></i>\n" +
    "      </span>\n" +
    "      <span><i class=\"fa fa-clock-o\"></i> {{rcpDisplay.recipe.time}} mins</span>\n" +
    "      <span><i class=\"fa fa-cutlery\"></i> {{rcpDisplay.recipe.nbPerson}} person(s)</span>\n" +
    "    </div>\n" +
    "    {{dcpDisplay.recipe.picture}}\n" +
    "    <div class=\"recipe-image\">\n" +
    "      <img ng-src=\"{{rcpDisplay.recipe.picture.public_id | formatImg }}\" ng-click=\"rcpDisplay.showMainPicture()\" />\n" +
    "    </div>\n" +
    "    <div class=\"recipe-create-info\">\n" +
    "      Created on {{rcpDisplay.recipe.createdOn | date}} by\n" +
    "      <a href ui-sref=\"profileView({username: rcpDisplay.recipe.author.username})\">\n" +
    "        {{rcpDisplay.recipe.author.username}}\n" +
    "      </a>.\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Utensils -->\n" +
    "    <div ng-show=\"rcpDisplay.recipe.utensils.length\">\n" +
    "      <h3 class=\"list-title\">Utensils</h3>\n" +
    "      <ul class=\"list\">\n" +
    "        <li ng-repeat=\"utensil in rcpDisplay.recipe.utensils\">\n" +
    "          {{utensil}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Ingredients -->\n" +
    "    <div>\n" +
    "      <h3 class=\"list-title\">Ingredients</h3>\n" +
    "      <ul class=\"list\">\n" +
    "        <li ng-repeat=\"ingredient in rcpDisplay.recipe.ingredients\">\n" +
    "          {{ingredient.qte}} <span ng-show=\"ingredient.unit\">{{ingredient.unit }} of </span>{{ingredient.name}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "      <h3 class=\"list-title\">Steps</h3>\n" +
    "      <ul class=\"list\">\n" +
    "        <li ng-repeat=\"step in rcpDisplay.recipe.steps\">\n" +
    "          {{step.number}} | {{step.action}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <div class=\"recipe-actions\">\n" +
    "      <button class=\"bg-primary\" ng-click=\"rcpDisplay.nextStep()\">Start Recipe</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Steps -->\n" +
    "  <div ng-show=\"rcpDisplay.showStep\" class=\"current-step\">\n" +
    "    <div class=\"previous\" ng-click=\"rcpDisplay.previousStep()\">\n" +
    "      <i class=\"fa fa-chevron-circle-left fa-3x\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"step\">\n" +
    "      <h2>Step {{rcpDisplay.currentStep.number}}</h2>\n" +
    "      <div class=\"action\">\n" +
    "        {{rcpDisplay.currentStep.action}}\n" +
    "      </div>\n" +
    "      <img ng-repeat=\"step in rcpDisplay.recipe.steps\"\n" +
    "           ng-if=\"step.picture\"\n" +
    "           ng-show=\"rcpDisplay.currentStep.number == step.number\"\n" +
    "        ng-src=\"{{step.picture.public_id | formatImg}}\" />\n" +
    "      <div class=\"timer\">\n" +
    "        <span ng-show=\"rcpDisplay.currentStep.time\">\n" +
    "          {{((rcpDisplay.currentStep.time*60)-rcpDisplay.timerSecondsPassed) | secondsToDateTime | date:'HH:mm:ss' }}\n" +
    "          <button ng-hide=\"rcpDisplay.timerRunning\" ng-click=\"rcpDisplay.timerStart()\"><i class=\"fa fa-play\"></i></button>\n" +
    "          <button ng-show=\"rcpDisplay.timerRunning\" ng-click=\"rcpDisplay.timerPause()\"><i class=\"fa fa-pause\"></i></button>\n" +
    "          <button ng-show=\"rcpDisplay.timerRunning\" ng-click=\"rcpDisplay.timerStop()\"><i class=\"fa fa-stop\"></i></button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"next\">\n" +
    "      <i class=\"fa fa-chevron-circle-right fa-3x\" ng-click=\"rcpDisplay.nextStep()\"></i>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- End of steps -->\n" +
    "  <div class=\"after-steps\" ng-show=\"rcpDisplay.stepsFinished\">\n" +
    "    <h2>Congratulations !</h2>\n" +
    "    <!-- Like -->\n" +
    "    <p ng-hide=\"rcpDisplay.liked\">\n" +
    "      Enjoyed that recipe?\n" +
    "      <span class=\"pointer-on\" ng-click=\"rcpDisplay.like()\">\n" +
    "        Like it\n" +
    "        <i class=\"fa fa-heart\"></i>\n" +
    "      </span>\n" +
    "    </p>\n" +
    "    <p ng-show=\"rcpDisplay.liked\">\n" +
    "      Thanks !\n" +
    "    </p>\n" +
    "    <!-- Picture -->\n" +
    "    <p>Or share a picture of your result with the community :)</p>\n" +
    "    <picture-upload target-url=\"rcpDisplay.picturesUploadUrl\"\n" +
    "      target-tags=\"rcpDisplay.picturesUploadTags\" callback=\"rcpDisplay.afterPictureUpload\"\n" +
    "      ng-hide=\"rcpDisplay.done\"></picture-upload>\n" +
    "    <div ng-show=\"rcpDisplay.done\">\n" +
    "      <p>Upload finished</p>\n" +
    "      <h2>Thanks for sharing !</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Thumbnails -->\n" +
    "  <div ng-if=\"rcpDisplay.recipe.pictures.length\" class=\"thumbnail-area\"\n" +
    "    ng-show=\"rcpDisplay.showInfoPage || rcpDisplay.stepsFinished\">\n" +
    "    <h3>Pictures of this recipe by other users:</h3>\n" +
    "    <div class=\"thumbnails\">\n" +
    "      <div class=\"thumbnail\" ng-click=\"rcpDisplay.openGallery($index)\"\n" +
    "        ng-repeat=\"pic in rcpDisplay.recipe.pictures | orderObjectBy:'createdOn':-1 track by $index\">\n" +
    "        <img ng-src=\"{{pic.miniThumbUrlSquare}}\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Comments -->\n" +
    "  <div ng-show=\"rcpDisplay.showInfoPage || rcpDisplay.stepsFinished\" class=\"comment-area\">\n" +
    "    <div class=\"add-comment\" ng-hide=\"rcpDisplay.commentAdded\">\n" +
    "      <h3>Leave a comment</h3>\n" +
    "      <div class=\"add-mark\" ng-mouseleave=\"rcpDisplay.markEvent.mouseLeave()\"\n" +
    "        ng-mouseup=\"rcpDisplay.markEvent.mouseUp()\">\n" +
    "        Give a mark: <i ng-repeat=\"t in [] | range: rcpDisplay.tempMark\" class=\"fa fa-star\"\n" +
    "          ng-mouseenter=\"rcpDisplay.markEvent.mouseEnter(false,$index)\">\n" +
    "          </i><i ng-repeat=\"t in [] | range: (5-rcpDisplay.tempMark)\" class=\"fa fa-star-o\"\n" +
    "          ng-mouseenter=\"rcpDisplay.markEvent.mouseEnter(true,$index)\"></i>\n" +
    "      </div>\n" +
    "      <textarea ng-model=\"rcpDisplay.currentComment\" placeholder=\"Type your comment here...\"></textarea>\n" +
    "      <button class=\"bg-primary\" ng-click=\"rcpDisplay.addComment()\" ng-disabled=\"vm.commentAdding\">Add comment</button>\n" +
    "    </div>\n" +
    "    <div class=\"comments\">\n" +
    "      <h3>Comments</h3>\n" +
    "      <div class=\"comment\" ng-repeat=\"comment in rcpDisplay.recipe.comments\">\n" +
    "        <a href=\"#\" class=\"profile-picture\">\n" +
    "          <img ng-if=\"comment.author.picture\" ng-src=\"{{comment.author.picture.public_id | formatImg:90:90 }}\" />\n" +
    "          <img ng-if=\"!comment.author.picture\" src=\"assets/images/user-default.png\" alt=\"game.title\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "          <a href ui-sref=\"profileView({username: comment.author.username})\">\n" +
    "            {{comment.author.username}}\n" +
    "          </a>.\n" +
    "          <div class=\"message-container\">\n" +
    "            <span ng-show=\"comment.mark\" class=\"info-top\">\n" +
    "              <i ng-repeat=\"t in [] | range: comment.mark\" class=\"fa fa-star\">\n" +
    "              </i><i ng-repeat=\"t in [] | range: (5-comment.mark)\" class=\"fa fa-star-o\">\n" +
    "              </i> -\n" +
    "            </span>\n" +
    "            <span class=\"info-top\">Added on {{comment.createdOn | date}}</span>\n" +
    "            <p>{{comment.message}}</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("recipe/search/search.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("recipe/search/search.tpl.html",
    "<div class=\"recipe-search\">\n" +
    "  <div class=\"top input-fw  \">\n" +
    "    <input type=\"text\" class=\"input\" ng-model=\"rcpSearch.recipeToSearch\" ng-change=\"rcpSearch.search()\"\n" +
    "           ng-model-options=\"{ debounce: 500 }\" placeholder=\"Search for a recipe\" />\n" +
    "  </div>\n" +
    "\n" +
    "  <div masonry>\n" +
    "    <div class=\"masonry-brick masonry-nb-3\" ng-repeat=\"recipe in rcpSearch.recipes\" ng-click=\"rcpSearch.displayRecipe(recipe._id)\">\n" +
    "      <img ng-src=\"{{ recipe.picture.public_id\n" +
    "       | formatImg }}\" alt=\"recipe.name\" />\n" +
    "      <div class=\"recipe-title\">\n" +
    "        <h2>{{recipe.name}}</h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    " </div>\n" +
    "");
}]);

angular.module("register/register.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/register.tpl.html",
    "<div class=\"signup\">\n" +
    "  <h2>Join Cookeasy !</h2>\n" +
    "  <form name=\"registerForm\" ng-submit=\"register.register()\" role=\"form\" class=\"input-fw\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Username\n" +
    "        <input type=\"text\" name=\"username\" class=\"input\" ng-model=\"register.user.username\" ng-minlength=\"2\"\n" +
    "               placeholder=\"Choose a username\" required />\n" +
    "      </label>\n" +
    "      <span ng-show=\"registerForm.username.$dirty && registerForm.username.$error.required\" class=\"help-block\">\n" +
    "        Username required\n" +
    "      </span>\n" +
    "      <div ng-show=\"registerForm.email.$touched\">\n" +
    "        <span ng-show=\"registerForm.username.$error.required\" class=\"help-block\">Username</span>\n" +
    "        <span ng-show=\"registerForm.username.$error.email\" class=\"help-block\">Username too short</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        E-mail\n" +
    "        <input type=\"email\" name=\"email\" class=\"input\" ng-model=\"register.user.email\"\n" +
    "               placeholder=\"Enter your e-mail address\" required />\n" +
    "      </label>\n" +
    "      <div ng-show=\"registerForm.email.$touched\">\n" +
    "        <span ng-show=\"registerForm.email.$error.required\" class=\"help-block\">E-mail is required</span>\n" +
    "        <span ng-show=\"registerForm.email.$error.email\" class=\"help-block\">This is not a valid e-mail</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Password\n" +
    "        <input type=\"password\" name=\"password\" class=\"input\" ng-model=\"register.user.password\" ng-minlength=\"6\"\n" +
    "               placeholder=\"Enter your password\" required />\n" +
    "      </label>\n" +
    "      <div ng-show=\"registerForm.email.$touched\">\n" +
    "        <span ng-show=\"registerForm.password.$error.required\" class=\"help-block\">Password is required</span>\n" +
    "        <span ng-show=\"registerForm.password.$error.minlength\" class=\"help-block\">Password too short</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\" name=\"terms\" ng-model=\"termsAccepted\" />\n" +
    "        I agree with <a ui-sref=\"terms\">terms and conditions</a>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"form-actions\">\n" +
    "      <div ng-show=\"signup.error\" class=\"alert alert-danger\">{{signup.error}}</div>\n" +
    "      <button ng-type=\"submit\" ng-disabled=\"registerForm.$invalid || dataLoading || !termsAccepted\"\n" +
    "              class=\"btn btn-submit\">\n" +
    "        Register\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("widgets/modal-gallery/modal-gallery.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("widgets/modal-gallery/modal-gallery.tpl.html",
    "<div id=\"modal\" ng-click=\"mw.close()\">\n" +
    "  <div class=\"modalDialog\" ng-click=\"$event.stopPropagation()\">\n" +
    "    <a class=\"close\" ng-click=\"mw.close()\">X</a>\n" +
    "    <img ng-if=\"mw.currentPicture\" ng-src=\"{{mw.currentPicture.public_id | formatImg}}\" ng-click=\"mw.nextPicture()\"/>\n" +
    "    <i class=\"fa fa-chevron-circle-left fa-2x\" ng-click=\"mw.previousPicture()\" ng-if=\"!mw.isFirstImage()\"></i>\n" +
    "    <i class=\"fa fa-chevron-circle-right fa-2x\" ng-click=\"mw.nextPicture()\" ng-if=\"!mw.isLastImage()\"></i>\n" +
    "    <i></i>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("widgets/picture-upload/picture-upload.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("widgets/picture-upload/picture-upload.tpl.html",
    "<div>\n" +
    "  <div class=\"add-picture\" ng-app=\"fileUpload\" ng-hide=\"pictureUpload.uploadProgress\">\n" +
    "      <div ngf-drop ngf-select ng-model=\"pictureUpload.files\" class=\"drop-box\"\n" +
    "          ngf-drag-over-class=\"dragover\" ngf-multiple=\"true\" ngf-allow-dir=\"true\"\n" +
    "          accept=\"image/*\">\n" +
    "        <div ng-hide=\"pictureUpload.imageUploaded\">\n" +
    "          <i class=\"fa fa-camera fa-3x\"></i>\n" +
    "          <p>Add or Drop picture<p>\n" +
    "        </div>\n" +
    "        <div class=\"preview\" ng-if=\"pictureUpload.imageUploaded\">\n" +
    "          <img ng-src=\"{{pictureUpload.imageUploaded.public_id | formatImg}}\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"pictureUpload.uploadProgress\" class=\"drop-box\">\n" +
    "    <progress value=\"{{pictureUpload.uploadProgress}}\" max=\"100\"></progress>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("widgets/step-line/step-line.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("widgets/step-line/step-line.tpl.html",
    "<svg ng-attr-height=\"{{stepLine.graph.height}}\" ng-attr-width=\"{{stepLine.graph.width}}\">\n" +
    "  <line ng-attr-x1=\"{{stepLine.graph.rSize}}\" ng-attr-y1=\"{{stepLine.graph.height/2}}\"\n" +
    "    ng-attr-x2=\"{{stepLine.graph.width-graph.rSize}}\" ng-attr-y2=\"{{stepLine.graph.height/2}}\"/>\n" +
    "  <circle ng-repeat-start=\"step in stepLine.stepPos\"\n" +
    "    ng-class=\"{current: stepLine.current==step.text}\" ng-click=\"stepLine.callbackClick(step.text)\"\n" +
    "    ng-attr-cx=\"{{step.x}}\" ng-attr-cy=\"{{stepLine.graph.height/2}}\"\n" +
    "    ng-attr-r=\"{{stepLine.graph.rSize}}\">\n" +
    "  </circle>\n" +
    "  <text ng-repeat-end ng-attr-x=\"{{step.x}}\" ng-attr-y=\"{{stepLine.graph.height/2 +5}}\"\n" +
    "    text-anchor=\"middle\">{{step.text}}</text>\n" +
    "</svg>\n" +
    "");
}]);

angular.module("widgets/user-activities/user-activities.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("widgets/user-activities/user-activities.tpl.html",
    "<ul>\n" +
    "  <li ng-repeat=\"activity in userActivities.activities\" class=\"box-white\">\n" +
    "    <div class=\"top\">\n" +
    "      <div class=\"picture\">\n" +
    "        <img ng-src=\"{{userActivities.getPicture(activity.picture)  | formatImg:50:50 }}\" />\n" +
    "      </div>\n" +
    "      <div class=\"info\">\n" +
    "        <div>{{activity.title}}</div>\n" +
    "        <div>{{activity.date | date}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"content\">\n" +
    "      <h3 ng-if=\"activity.content.title\">{{activity.content.title}}</h3>\n" +
    "      <img ng-if=\"activity.content.picture\" ng-src=\"{{activity.content.picture.public_id | formatImg:300:200}}\" />\n" +
    "      <p ng-if=\"activity.content.text\">{{activity.content.text}}</p>\n" +
    "    </div>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
