const getState = ({ getStore, getActions, setStore, useParams }) => {
  return {
    store: {
      token: localStorage.getItem("token") || "",
      // urlBase:"https://talleresvenapp.herokuapp.com/",
      urlBase: process.env.BACKEND_URL,

      taller: [],
      service: [],
      user: [],
      myservice: [],
    },
    actions: {
      userRegister: async (user) => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${store.token}`,
            },
            body: JSON.stringify(user),
          });
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      userRegisterTaller: async (taller) => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/taller`, {
            method: "POST",

            headers: {
              Authorization: `Bearer ${store.token}`,
            },
            body: taller,
          });
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      ///funcion para actualziar user///
      updateUser: async (user) => {
        let store = getStore();

        try {
          let response = await fetch(`${store.urlBase}/api/user/update`, {
            method: "PUT",
            headers: {
              // mode: "no-cors",
              Authorization: `Bearer ${store.token}`,
            },
            body: user,
          });
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      ///funcion para actualziar taller///
      updateTaller: async (taller, taller_id) => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/taller/${taller_id}`,
            {
              method: "PUT",
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
              },
              body: taller,
            }
          );
          if (response.ok) {
            //getActions().getTaller()
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      ///funcion para eliminar un taller///
      deleteTaller: async (taller) => {
        let store = getStore();
        console.log(taller);
        try {
          let response = await fetch(
            `${store.urlBase}/api/talleres/${taller}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
              },
              // body: JSON.stringify(service),
            }
          );
          if (response.ok) {
            getActions().getTaller();
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      ////funcion para registrar un servicio///
      registerService: async (service) => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/service`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
            body: service,
          });
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      ///funcion para actualziar servicio///
      updateService: async (service) => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/service/update`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
            body: service,
          });
          if (response.ok) {
            getActions().getTaller();
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      ///funcion para eliminar un servicio///
      deleteService: async (service) => {
        let store = getStore();
        console.log(service);
        try {
          let response = await fetch(
            `${store.urlBase}/api/services/${service}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
              },
              // body: JSON.stringify(service),
            }
          );
          if (response.ok) {
            getActions().getService();
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      getUserToke: async () => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
          });
          let data = await response.json();

          if (response.ok) {
            setStore({
              ...store,
              user: data,
            });
          }
        } catch {
          console.log(error);
        }
      },

      login: async (user) => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (response.ok) {
            let data = await response.json();
            setStore({ token: data.token });
            localStorage.setItem("token", data.token);
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },
      logout: () => {
        let store = getStore();
        localStorage.removeItem("token");

        setStore({ ...store, token: "" });
      },

      ////lo que agregue:
      getService: async () => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/services`);
          let data = await response.json();
          if (response.ok) {
            setStore({
              ...store,
              service: data,
            });
          }
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      getTaller: async () => {
        let store = getStore();
        try {
          let response = await fetch(`${store.urlBase}/api/talleres`);
          let data = await response.json();
          if (response.ok) {
            setStore({
              ...store,
              taller: data,
            });
          }
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },

      setMyservice: (id) => {
        let store = getStore();
        let listMyservice = store.service.find((item) => item.id == id);
        console.log(listMyservice);
        setStore({
          ...setStore,
          myservice: [...store.myservice, listMyservice],
        });
      },

      getTotalPrice: () => {
        let store = getStore();
        let price = store.myservice.map((item) => item.precio);
        let sum = 0;
        for (let i = 0; i < price.length; i++) {
          sum += price[i];
        }
        return sum;
      },
      fecha: () => {
        let hoy = new Date();
        let dia = hoy.getDate();
        let mes = hoy.getMonth() + 1;
        let agnio = hoy.getFullYear();
        // let hora = hoy.getHours();
        // let min = hoy.getMinutes();
        // let sec = hoy.getSeconds();
        let formato = dia + "-" + mes + "-" + agnio;
        return formato;
      },
      reloj: () => {
        let hora = new Date().toLocaleTimeString();
        // // let myinterval = setInterval(hora,1000);
        return hora;

        // let ahora = new Date();
        // setInterval(()=>{
        // let hora = ahora.getHours();
        // let min = ahora.getMinutes();
        // let sec = ahora.getSeconds();
        // return
        // })
      },
    },
  };
};

export default getState;
