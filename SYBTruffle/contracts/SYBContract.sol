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
        ServiceOrder[] services;
        uint servicesCounter;
    }

    mapping (address => User) public users;

    // Events
    event onCreateUser(address indexed userAddress);

    function createUser(string _firstName, string _lastName, string _userAddress) public returns (bool) {
        users[msg.sender].firstName = _firstName;
        users[msg.sender].lastName = _lastName;
        users[msg.sender].userAddress = _userAddress;
        users[msg.sender].servicesCounter = 0;

        onCreateUser(msg.sender);

        return true;
    }

    function createServiceOrder(uint _id, uint _category, string _name, string _description, uint _price) public {
        users[msg.sender].services.push(ServiceOrder(
            _id,
            _category,
            msg.sender,
            0x0,
            false,
            _price,
            0,
            _name,
            _description
        ));

        users[msg.sender].servicesCounter++;
    }

    function getUserPendingServiceOrders() public constant returns (uint[]) {
        // prepare intermediary array
		uint[] memory serviceOrderIds = new uint[](users[msg.sender].servicesCounter);
        uint numberOfPendingOrders = 0;

		// iterate over orders
		for (uint i = 0; i < users[msg.sender].servicesCounter; i++) {
            if (!users[msg.sender].services[i].isDone) {
                serviceOrderIds[i] = users[msg.sender].services[i].serviceOrderId;
                numberOfPendingOrders++;
            }
		}

        // return all service order ids
        return (serviceOrderIds);
    }

    function getService(uint _id) public constant returns(uint, uint, address, address, bool, uint, uint, string, string) {
        ServiceOrder storage tmpOrder;
        for (uint i = 0; i < users[msg.sender].servicesCounter; i++) {
            if (users[msg.sender].services[i].serviceOrderId == _id) {
                tmpOrder = users[msg.sender].services[i];
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

    function getAvgScore(address _user, uint _categoryId) public constant returns(uint) {
        require(users[_user].servicesCounter > 0);
        uint scoreSum = 0;
        uint scoreCounter = 0;
        for (uint i = 0; i < users[_user].servicesCounter; i++) {
            if (users[_user].services[i].serviceOrderCategory == _categoryId && users[_user].services[i].score != 0) {
                scoreSum += users[_user].services[i].score;
                scoreCounter++;
            }
        }

        return scoreSum / scoreCounter;
    }

    function payServiceOrder(uint _id, address _recipient, uint _score) payable public {
		// we check whether there is at least one article
		require(users[_recipient].servicesCounter > 0);

		// we retrieve the service order
        ServiceOrder storage service;
        for (uint i = 0; i < users[_recipient].servicesCounter; i++) {
            if (users[_recipient].services[i].serviceOrderId == _id) {
		        service = users[_recipient].services[i];
                break;
            }
        }

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