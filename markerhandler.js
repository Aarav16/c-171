var userId = null;
AFRAME.registerComponent("markerhandler", {
    init: async function () {
    
     if (userId === null) {
        this.askUserId();
  }

      
      var toys = await this.getToys();

      
      this.el.addEventListener("markerFound", () => {
        console.log("marker is found")
        this.handleMarkerFound();
      });
  
      this.el.addEventListener("markerLost", () => {
        console.log("marker is lost")
        this.handleMarkerLost();
      });
    },
    askUserId: function () {
      var iconUrl = "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png";
      swal({
        title: "Welcome to toy shop!!",
        icon: iconUrl,
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your user id",
            type: "number",
            min: 1
          }
        },
        closeOnClickOutside: false,
      }).then(inputValue => {
        userId = inputValue;
      });
    },
    handleMarkerFound: function () {
       // Getting today's day
    var todaysDate = new Date();
    var todaysDay = todaysDate.getDay();

    // sunday - saturday : 0 - 6
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    
    var toys = toys.filter(toys => toys.id === markerId)[0];

  
    if (toys.unavailable_days.includes(days[todaysDay])) {
      swal({
        icon: "warning",
        title: toys.toys_name.toUpperCase(),
        text: "This toy is out of stock!!!",
        timer: 2500,
        buttons: false
      });
    } else {
      
      var model = document.querySelector(`#model-${toys.id}`);
      model.setAttribute("position", toys.model_geometry.position);
      model.setAttribute("rotation", toys.model_geometry.rotation);
      model.setAttribute("scale", toys.model_geometry.scale);

         
      model.setAttribute("visible", true);

      var Container = document.querySelector(`#main-plane-${toys.id}`);
      infoContainer.setAttribute("visible", true);

      var priceplane = document.querySelector(`#price-plane-${toys.id}`);
      priceplane.setAttribute("visible", true)

      //Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      // Changing button div visibility
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";
    
        var orderSummaryButton = document.getElementById("orderSummary-button");
        var orderButtton = document.getElementById("order-button");
        if (userNumber != null) {
          //Handling Click Events
          ratingButton.addEventListener("click", function () {
            swal({
              icon: "warning",
              title: "Rate toy",
              text: "Work In Progress"
            });
          });
  
          orderButtton.addEventListener("click", () => {
            var uNumber;
            userNumber <= 9 ? (uNumber = `T0${userNumber}`) : `T${uNumber}`;
            this.handleOrder(uNumber, toys);
  
            swal({
              icon: "https://i.imgur.com/4NZ6uLY.jpg",
              title: "Thanks For Order !",
              text: "Your order will arrive at you house!",
              timer: 2000,
              buttons: false
            });
          });
        }
      }
    },
    handleOrder: function (tNumber, dish) {
      // Reading current table order details
      firebase
        .firestore()
        .collection("user")
        .doc(uNumber)
        .get()
        .then(doc => {
          var details = doc.data();
  
          if (details["current_orders"][toys.id]) {
            // Increasing Current Quantity
            details["current_orders"][toys.id]["quantity"] += 1;
  
            //Calculating Subtotal of item
            var currentQuantity = details["current_orders"][toys.id]["quantity"];
  
            details["current_orders"][toys.id]["subtotal"] =
              currentQuantity * toys.price;
          } else {
            details["current_orders"][toys.id] = {
              item: toys.toys_name,
              price: toys.price,
              quantity: 1,
              subtotal: toys.price * 1
            };
          }
  
          details.total_bill += toys.price;
  
          //Updating db
          firebase
            .firestore()
            .collection("user")
            .doc(doc.id)
            .update(details);
        });
    },
    //Function to get the dishes collection from db
    getAllToys: async function () {
      return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    },
    handleMarkerLost: function () {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "none";
    }
  });
    
        