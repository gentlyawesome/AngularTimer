angular
  .module("HomeApp", ['firebase', 'Config'])
  .controller("HomeCtrl", function ($scope, FBURL, FBURL_BASE, FBURL_MAIN, $firebaseArray, $location){
    var main = new Firebase(FBURL_MAIN);
    var ref = new Firebase(FBURL);
    var ref_status = new Firebase(FBURL_BASE + ".info/connected");
    var date = new Date;
    var parse_date = date.getTime();

    ref_status.on("value", function(snap){
      if (snap.val() === true) {
        $scope.connection_status = "Online";
      } else {
        $scope.connection_status = "Disconnected, please check your internet.";
      } 
    });

    $scope.employees = [
      {name: "Jenalyn"},
      {name: "Petronio"},
      {name: "Meryelle"},
      {name: "Benjo "},
      {name: "Mohammad"},
      {name: "Bernabe"},
      {name: "Madelene"},
      {name: "Daryll"},
      {name: "Jermin"},
      {name: "Ed Jasper"},
      {name: "Melanie"},
      {name: "Jeremay"},
      {name: "Lea Cris"},
      {name: "Cornelio "}
    ];


    $scope.setDate = function(){
      var date = $scope.datePick;
      var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
      var clockings = new Firebase(FBURL + date_format);
      
      main.update({ selectedDate : date });

      $scope.times = $firebaseArray(clockings);
    };

    main.on("value", function(snapshot) {
      var data = snapshot.val();
      $scope.selectedDate = data.selectedDate;

      var date = new Date($scope.selectedDate);
      var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
      var clockings = new Firebase(FBURL + date_format);

      $scope.times = $firebaseArray(clockings);
    });


    $scope.startTimer = function (type){
        var date = new Date;
        var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
        var ref = new Firebase(FBURL + date_format);

        ref.push({
          employeeName: $scope.employeeName,
	  inDate: date.getTime(),
	  date: date.getTime(),
          timeOut: false,
	  type: type
        });
	
	$scope.employeeName = "";
        $scope.timerForm.$setPristine();
        $scope.timerForm.$setUntouched();
        $scope.timerForm.$setValidity();

    }; 

    $scope.stopTimer = function (id){
        this.$broadcast('timer-stop');
        

        var date = new Date($scope.selectedDate);
        var out_date = new Date();
        var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
        var clocking = new Firebase(FBURL + date_format + '/' + id);

        clocking.once('value', function(snap) { 
          var first_data = snap.val();
          $scope.$on('timer-stopped', function (event, data){
            clocking.set({
              employeeName : first_data.employeeName,
	      inDate : first_data.inDate,
	      date : first_data.date,
	      outDate: out_date.getTime(),
	      timeOut : true,  
	      type : first_data.type,  
              days: data.days, 
              hours: data.hours, 
              millis: data.millis,
              minutes: data.minutes, 
              seconds: data.seconds, 
              timeoutId: data.timeoutId 
            });
          });
        });
    };

    //$scope.$on('timer-stopped', function (event, data){
    //    console.log('Timer Stopped - data = ', data);
    //});


  })

  .controller("ClockingCtrl", function ($scope, FBURL, FBURL_MAIN,FBURL_BASE, $firebaseArray){
    var ref = new Firebase(FBURL);
    var main = new Firebase(FBURL_MAIN);
    var ref_status = new Firebase(FBURL_BASE + ".info/connected");

    ref_status.on("value", function(snap){
      if (snap.val() === true) {
        $scope.connection_status = "Online";
      } else {
        $scope.connection_status = "Disconnected, please check your internet.";
      } 
    });

    $scope.setDate = function(){
      var date = $scope.datePick;
      var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
      var clockings = new Firebase(FBURL + date_format);

      $scope.times = $firebaseArray(clockings);
    };
   
    main.on("value", function(snapshot) {
      var data = snapshot.val();
      $scope.selectedDate = data.selectedDate;

      var date = new Date($scope.selectedDate);
      var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
      var clockings = new Firebase(FBURL + date_format);

      $scope.times = $firebaseArray(clockings.orderByChild('type').equalTo('TimeIn'));
    });
    
  })

  .controller("BreakCtrl", function ($scope, FBURL, FBURL_MAIN, FBURL_BASE, $firebaseArray){
    var ref = new Firebase(FBURL);
    var main = new Firebase(FBURL_MAIN);
    var ref_status = new Firebase(FBURL_BASE + ".info/connected");

    ref_status.on("value", function(snap){
      if (snap.val() === true) {
        $scope.connection_status = "Online";
      } else {
        $scope.connection_status = "Disconnected, please check your internet.";
      } 
    });

    $scope.setDate = function(){
      var date = $scope.datePick;
      var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
      var clockings = new Firebase(FBURL + date_format);

      $scope.times = $firebaseArray(clockings);
    };
   
    main.on("value", function(snapshot) {
      var data = snapshot.val();
      $scope.selectedDate = data.selectedDate;

      var date = new Date($scope.selectedDate);
      var date_format = date.getFullYear()+'-'+date.getDate()+'-'+(date.getMonth()+1);
      var clockings = new Firebase(FBURL + date_format);

      $scope.times = $firebaseArray(clockings.orderByChild('type').equalTo('Break'));
    });
    
  });
