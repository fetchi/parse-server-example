
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
// iOS push testing
Parse.Cloud.define("iosPushTest", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  var user = request.user;

  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var messageText = params.text;
  var targetUser = params.user;
  var fromUser = params.fromuser;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only 
  pushQuery.equalTo('user', targetUser);
  pushQuery.equalTo('channels', "");

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "New message from " + fromUser  + ": " + messageText,
      badge: "Increment",
      sound: "default"
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
// accept frnd request notification
Parse.Cloud.define("acceptfrndreq", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  var user = request.user;

  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var targetUser = params.user;
  var fromUser = params.fromuser;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only 
  pushQuery.equalTo('user', targetUser);

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "Friend request accepted: " + fromUser  + " has accepted your friend request! Let's fetchii!",
      badge: "Increment",
      sound: "default"
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});

//send frnd request notification
Parse.Cloud.define("sendfrndreq", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  var user = request.user;

  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var messageText = params.text;
  var targetUser = params.user;
  var fromUser = params.fromuser;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only 
  pushQuery.equalTo('user', targetUser);

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: fromUser  + " wants to add you as his/her fetchii friend, go Contact to accept/reject this request",
      badge: "Increment",
      sound: "default"
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
