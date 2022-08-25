AFRAME.registerComponent("create-markers", {
  init: async function () {
    var mainScene = document.querySelector("#main-scene");
    var toys = await this.getAllToys();
    toys.map(toy => {
      var marker = document.createElement("a-marker");
      marker.setAttribute("id","toy", toys.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url","toy" ,marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);
    })  
    
      // Getting today's day
      var todaysDate = new Date();
      var todaysDay = todaysDate.getDay();
      // Sunday - Saturday : 0 - 6
      var days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];

      if (!toys.unavailable_days.includes(days[todaysDay])) {
        // Adding 3D model to scene
        var model = document.createElement("a-entity");
        model.setAttribute("id", `model-${toys.id}`);
        model.setAttribute("position", toys.model_geometry.position);
        model.setAttribute("rotation", toys.model_geometry.rotation);
        model.setAttribute("scale", toys.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${toys.model_url})`);
        model.setAttribute("gesture-handler", {});
        marker.appendChild(model);

        // Info Container
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${toys.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        marker.appendChild(mainPlane);

        // toys title background plane
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${toys.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);

        // toys title
        var toysTitle = document.createElement("a-entity");
        toysTitle.setAttribute("id", `toys-title-${toys.id}`);
        toysTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        toysTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        toysTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: toys.toys_name.toUpperCase()
        });
        titlePlane.appendChild(toysTitle);

        // Info List
        var info = document.createElement("a-entity");
        info.setAttribute("id", `info-${toys.id}`);
        info.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        info.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        info.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${toys.info.join("\n\n")}`
        });
        mainPlane.appendChild(info);

        //Plane to show the price of the toys
        var pricePlane = document.createElement("a-image");
        pricePlane.setAttribute("id", `price-plane-${toys.id}`);
        pricePlane.setAttribute(
          "src",
          "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
        );
        pricePlane.setAttribute("width", 0.8);
        pricePlane.setAttribute("height", 0.8);
        pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
        pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });

        //Price of the toys
        var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${toys.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "mozillavr",
          color: "white",
          width: 3,
          align: "center",
          value: `Only\n $${toys.price}`
        });

        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);
      }
    },

    
  getAllToys: async function () {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
})

      

      

       