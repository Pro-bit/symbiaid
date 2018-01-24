pragma solidity ^0.4.15;

contract SYBContract {
    struct ServiceOrder {
        uint serviceOrderId;
        uint serviceOrderCategory;
        address userCreated;
        address userAccepted;
        bool isDone;
        uint price;
        uint score;
        string name;
        string description;
    }

    struct User {
        string firstName;
        string lastName;
        string userAddress;
        //ServiceOrder[] services;
        uint servicesCounter;
    }

    mapping (address => User) public users;
    mapping (uint => ServiceOrder) public services;

    uint allServicesCounter = 0;

    // Events
    event onCreateUser(address indexed userAddress);
    event onCreateServiceOrder(uint indexed serviceOrderId);

    function createUser(string _firstName, string _lastName, string _userAddress) public returns (bool) {
        users[msg.sender].firstName = _firstName;
        users[msg.sender].lastName = _lastName;
        users[msg.sender].userAddress = _userAddress;
        users[msg.sender].servicesCounter = 0;

        onCreateUser(msg.sender);

        return true;
    }

    function createServiceOrder(uint _id, uint _category, address _userCreated, string _name, string _description, uint _price) public {
        // user cant accept his service order
        require(msg.sender != _userCreated);

        // add new service 
        services[allServicesCounter] = ServiceOrder(
            _id,            // service order id
            _category,      // id category
            _userCreated,   // userCreated
            msg.sender,     // userAccepted
            false,          // isDone
            _price,         // price
            0,              // score
            _name,          // service order name
            _description    // service order description
        );

        // update user services counter
        users[_userCreated].servicesCounter = users[_userCreated].servicesCounter + 1;
        // update all services counter
        allServicesCounter++;

        // trigger event
        onCreateServiceOrder(_id);
    }

    function getServicesCounter() public constant returns (uint) {
        return users[msg.sender].servicesCounter;
    }

    function getUserServices() public constant returns (uint[]) {
        uint[] memory serviceOrderIds = new uint[](allServicesCounter);
        uint numberOfOrders = 0;

		// iterate over orders
		for (uint i = 0; i < allServicesCounter; i++) {
            if (services[i].userCreated == msg.sender) {
                serviceOrderIds[i] = services[i].serviceOrderId;
                numberOfOrders++;
            }
		}

        // copy the serviceOrderIds array into smaller array
        uint[] memory serviceOrders = new uint[](numberOfOrders);
        for (uint j = 0; j < numberOfOrders; j++) {
            serviceOrders[j] = serviceOrderIds[j];
        }

        // return all service order ids
        return (serviceOrders);
    }

    function getUserPendingServiceOrders() public constant returns (uint[]) {
        uint[] memory serviceOrderIds = new uint[](allServicesCounter);
        uint numberOfOrders = 0;

		// iterate over orders
		for (uint i = 0; i < allServicesCounter; i++) {
            if (services[i].userCreated == msg.sender && !services[i].isDone) {
                serviceOrderIds[i] = services[i].serviceOrderId;
                numberOfOrders++;
            }
		}

        // copy the serviceOrderIds array into smaller array
        uint[] memory serviceOrders = new uint[](numberOfOrders);
        for (uint j = 0; j < numberOfOrders; j++) {
            serviceOrders[j] = serviceOrderIds[j];
        }

        // return all service order ids
        return (serviceOrders);
    }

    function getUserDoneServiceOrders() public constant returns (uint[]) {
        uint[] memory serviceOrderIds = new uint[](allServicesCounter);
        uint numberOfOrders = 0;

		// iterate over orders
		for (uint i = 0; i < allServicesCounter; i++) {
            if (services[i].userCreated == msg.sender && services[i].isDone) {
                serviceOrderIds[i] = services[i].serviceOrderId;
                numberOfOrders++;
            }
		}

        // copy the serviceOrderIds array into smaller array
        uint[] memory serviceOrders = new uint[](numberOfOrders);
        for (uint j = 0; j < numberOfOrders; j++) {
            serviceOrders[j] = serviceOrderIds[j];
        }

        // return all service order ids
        return (serviceOrders);
    }

    function getUserAcceptedServiceOrders() public constant returns (uint[]) {
        uint[] memory serviceOrderIds = new uint[](allServicesCounter);
        uint numberOfOrders = 0;

		// iterate over orders
		for (uint i = 0; i < allServicesCounter; i++) {
            if (services[i].userAccepted == msg.sender) {
                serviceOrderIds[i] = services[i].serviceOrderId;
                numberOfOrders++;
            }
		}

        // copy the serviceOrderIds array into smaller array
        uint[] memory serviceOrders = new uint[](numberOfOrders);
        for (uint j = 0; j < numberOfOrders; j++) {
            serviceOrders[j] = serviceOrderIds[j];
        }

        // return all service order ids
        return (serviceOrders);
    }

    function getService(uint _id) public constant returns(uint, uint, address, address, bool, uint, uint, string, string) {
        ServiceOrder storage tmpOrder;
        for (uint i = 0; i < allServicesCounter; i++) {
            if (services[i].serviceOrderId == _id) {
                tmpOrder = services[i];
                break;
            }
        }

        return (
            tmpOrder.serviceOrderId,
            tmpOrder.serviceOrderCategory,
            tmpOrder.userCreated,
            tmpOrder.userAccepted,
            tmpOrder.isDone,
            tmpOrder.price,
            tmpOrder.score,
            tmpOrder.name,
            tmpOrder.description
        );
    }

    function getAvgScore(address _user, uint _categoryId) public constant returns(uint, uint) {
        //require(users[_user].servicesCounter > 0);
        uint scoreSum = 0;
        uint scoreCounter = 0;
        for (uint i = 0; i < allServicesCounter; i++) {
            if (_user == services[i].userCreated && services[i].serviceOrderCategory == _categoryId && services[i].score != 0) {
                scoreSum += services[i].score;
                scoreCounter++;
            }
        }

        return (scoreCounter != 0 ? (scoreSum / scoreCounter) : 0, scoreCounter);
    }

    function payServiceOrder(uint _id, address _recipient, uint _score) payable public {
		// we check whether there is at least one article
		require(users[_recipient].servicesCounter > 0);

		// we retrieve the service order
        ServiceOrder storage service = services[_id];

		// we check whether the service order has not already been sold
		require(service.userAccepted == 0x0);

		// we don't allow the seller to buy his/her own service order
		require(service.userCreated != msg.sender);

		// we check whether the value sent corresponds to the service order price
		require(service.price == msg.value);

		// keep buyer's information
		service.userAccepted = msg.sender;

		// the buyer can buy the service order
        _recipient.send(msg.value);

        // set isDone to true (transaction is done)
        service.isDone = true;

        // save the score
        service.score = _score;

		// trigger the event
		//buyArticleEvent(_id, article.seller, article.buyer, article.name, article.price);
	}
}