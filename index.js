// unique id generator
function* generateId() {
  var id = 1;
  while (true) {
    yield id++;
  }
}
const guid = generateId();

const initialState = [
  {
    id: guid.next().value,
    count: 0,
    increment: 0,
    decrement: 0,
    incrementInputValue: 4,
    decrementInputValue: 5,
  },
];

// dom element collect
CounterBoxEl = document.getElementById("counterBox");
counterEl = document.getElementsByClassName("counter");
addCounterBtnEl = document.getElementById("addCounter");
resetBtnEl = document.getElementById("reset");

// action indetifires
const ADD_COUNTER = "addCount";
const RESET = "reset";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const INCREMENT_INPUT_VALUE = "incrementInputValue";
const DECREMENT_INPUT_VALUE = "decrementInputValue";

// action creators
const addCounter = (uid) => {
  return {
    type: ADD_COUNTER,
    payload: uid,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};
const increment = (id, increment) => {
  return {
    type: INCREMENT,
    payload: {
      id: id,
      value: increment,
    },
  };
};
const decrement = (id, decrement) => {
  return {
    type: DECREMENT,
    payload: {
      id: id,
      value: decrement,
    },
  };
};

const incrementInputValue = (id, value) => {
  return {
    type: INCREMENT_INPUT_VALUE,
    payload: {
      id: id,
      value: value,
    },
  };
};
const decrementInputValue = (id, value) => {
  return {
    type: DECREMENT_INPUT_VALUE,
    payload: {
      id: id,
      value: value,
    },
  };
};

// define reducer function
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTER:
      //const { counter } = state;
      return [
        ...state,
        {
          id: action.payload,
          count: 0,
          increment: 0,
          decrement: 0,
          incrementInputValue: 4,
          decrementInputValue: 5,
        },
      ];
      break;

    case INCREMENT:
      const updateStateIncrement = state.map((item) => {
        if (`increment-${item.id}` === action.payload.id) {
          return {
            ...item,
            count: Number(item.count) + Number(item.incrementInputValue),
          };
        } else {
          return {
            ...item,
          };
        }
      });
      return [...updateStateIncrement];
      break;

    case DECREMENT:
      const updateStateDecrement = state.map((item) => {
        if (`decrement-${item.id}` === action.payload.id) {
          return {
            ...item,
            count: Number(item.count) - Number(item.decrementInputValue),
          };
        } else {
          return {
            ...item,
          };
        }
      });

      return [...updateStateDecrement];
      break;
    case RESET:
      const updateStateReset = state.map((item) => {
        return {
          ...item,
          count: 0,
        };
      });
      return [...updateStateReset];
      break;

    case INCREMENT_INPUT_VALUE:
      console.log("INCREMENT_INPUT_VALUE");
      const updateState = state.map((item) => {
        //console.log(`increment-number-${item.id}`);
        //console.log(action.payload.id);
        if (`increment-number-${item.id}` === action.payload.id) {
          console.log("true");
          return {
            ...item,
            incrementInputValue: action.payload.value,
          };
        } else {
          return {
            ...item,
          };
        }
      });

      return [...updateState];
      break;
    case DECREMENT_INPUT_VALUE:
      console.log("INCREMENT_INPUT_VALUE");
      const updateStateDe = state.map((item) => {
        //console.log(`increment-number-${item.id}`);
        //console.log(action.payload.id);
        if (`decrement-number-${item.id}` === action.payload.id) {
          console.log("decrement");
          return {
            ...item,
            decrementInputValue: action.payload.value,
          };
        } else {
          return {
            ...item,
          };
        }
      });

      return [...updateStateDe];
      break;

    default:
      return state;
    //break;
  }
};

// create store
const store = Redux.createStore(counterReducer);

// update ui render
const render = () => {
  CounterBoxEl.innerHTML = "";
  const state = store.getState();
  console.log("State", state);
  state.forEach((element) => {
    //console.log(element);

    let html = `
    <div id="" class="counter p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow" >
    <div class="text-2xl font-semibold">${element.count}</div>

    <div class="flex justify-center flex-col">
        <div class="mb-3">
        <label class="form-label inline-block mb-2 text-gray-700">Increment count</lable>

        <input 
        class="increment-input-value border border-gray-300 form-control
        block
        w-full
        px-3
        py-1.5
        
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        type="number" 
        value="${element.incrementInputValue}" 
        id="increment-number-${element.id}" 
        placeholder="Please set increment number"
        />
        </div>
        <div class="mb-3">
        <label class="form-label inline-block mb-2 text-gray-700">Increment count</lable>
        <input 
        class="decrement-input-value border border-gray-300 form-control
        block
        w-full
        px-3
        py-1.5
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        type="number" 
        value="${element.decrementInputValue}" 
        id="decrement-number-${element.id}" 
        placeholder="Please set decrement number"/>
        </div> 
    </div>
    <div class="flex space-x-3">
    <button
        id="increment-${element.id}"
        class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
    >
        Increment
    </button>
    <button
        id="decrement-${element.id}"
        class="bg-red-400 text-white px-3 py-2 rounded shadow"
    >
        Decrement
    </button>
    </div>
</div>
    `;
    CounterBoxEl.insertAdjacentHTML("beforeend", html);
  });

  NodeList.prototype.addEventListener = function (
    event_name,
    callback,
    useCapture
  ) {
    for (var i = 0; i < this.length; i++) {
      this[i].addEventListener(event_name, callback, useCapture);
    }
  };

  document.querySelectorAll(".counter").addEventListener("click", function (e) {
    // alert(e.target.id);
    store.dispatch(increment(e.target.id, 5));
    store.dispatch(decrement(e.target.id, 2));
  });

  document
    .querySelectorAll(".increment-input-value")
    .addEventListener("blur", function (e) {
      //alert(e.target.value);
      store.dispatch(incrementInputValue(e.target.id, e.target.value));
    });
  document
    .querySelectorAll(".decrement-input-value")
    .addEventListener("blur", function (e) {
      //alert(e.target.id);
      store.dispatch(decrementInputValue(e.target.id, e.target.value));
    });
};

// update ui initially
render();

// subscribe
store.subscribe(render);

// event listners
addCounterBtnEl.addEventListener("click", () => {
  store.dispatch(addCounter(guid.next().value));
});

resetBtnEl.addEventListener("click", () => {
  store.dispatch(reset());
});
