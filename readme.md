1: UsernameLoginController:  

1.1: login(name, password, type, callBack)   
用在登录。参数为 学号，密码，用户类型（0是学生，1是管理员），回调函数（用于显示登录结果）。  
回调函数调用方式：callBack(obj)，obj的key：  
  nameNotValid（学号不合法返回true）,   
  passwordNotValid（密码不合法返回true）,  
  loginStatus（0:成功，1:学号不合法，2:密码不合法，-1:未知错误）.  
  message（后台信息）  

2: StudentQueryController:  

2.1: queryRoom(callBack)  
查询所有自习地点，查询预约情况要用。参数为回调函数（用于显示结果）。  
回调函数调用方式callBack(obj)，obj的key：  
  queryRoomStatus（0:成功，-1:未知错误），  
  roomList（room的列表，每个room有地点的id，地点名name，座位总数capacity，插座总数socket）  
  message（后台信息）  

2.2: queryOrder(date, timeNumber, callBack)  
查询预约。参数为 日期（xxxx-xx-xx），开始时间（xx:xx:xx），回调函数。  
callBack(obj)，obj的key:  
  queryOrderStatus（0:成功，1:格式错误，2:时间段不存在，-1:未知错误），  
  queryList（query的列表，每个query有location_name, order_count, socket_capacity, socket_count, order_capacity, location_id）  
  message（后台信息）  

3: StudentInfoController:  

3.1: getStudentInfo(callBack)  
查询学生基本信息。参数为回调函数。  
callBack(obj)，obj的key:  
  getInfoStatus（0:成功，1:用户不存在，-1:未知错误）  
  info（学生信息，有name, inBlackList）  
  message（后台信息）  

3.2: getOrders(callBack)  
查询学生个人预约，参数为回调函数。  
callBack(obj)，obj的key：  
  getOrdersStatus（0:成功，1:用户不存在，-1:未知错误）  
  orderList（order的列表，date，account_id，name，startTime，useSocket，endTime，state，order_id）（state: 0:待使用，1:已签到，2:已签退，-1:非法）  
  message（后台信息）  

4: RegisterController:  

4.1: createStudent(name, password, confirmPassword, callBack)  
注册，参数 学号，密码，确认的密码，回调函数  
回调obj:  
  nameNotValid  
  nameStatus（0:成功，1:学号已存在，-1:未知错误）  
  passwordNotValid  
  passwordNotConsistent  
  message（后台信息）  

5: OrderRoomController:  

5.1: orderRoom(date, startTime, locationId, useSocket, callBack)  
新增预约，参数 日期（xxxx-xx-xx），开始时间(xx:xx:xx)，位置id，是否用插座，回调函数  
回调obj:  
  orderStatus（0:成功，1:用户不存在，2:用户处于黑名单，3:日期格式错误，4:日期时间段段地点组合错误，5:已有相同预约，或预约已满，或插座数已满，-1:未知错误）  
  message（后台信息）  

6: CheckInAndOutController:  

6.1: checkIn(locationId, callBack)  
签到，参数 地点id（扫码获得），回调函数  
回调obj:  
  checkStatus（0:成功，1:预约不存在，2:预约状态不可被修改，3:非签到时间，-1:未知错误）  
  message（后台信息）  

6.2: checkOut(locationId, callBack)  
签退，参数 地点id（扫码获得），回调函数  
回调obj:  
  checkStatus（0:成功，1:预约不存在，2:预约状态不可被修改，3:非签退时间，-1:未知错误）  
  message（后台信息）  

7: CancelOrderController:  

7.1: cancelOrder(orderId, date, startTime, callBack) （date和startTime是用来检查时间的）  
取消预约，参数 预约id，日期，开始时间，回调函数  
obj:  
  cancelStatus（0:成功，1:该预约不存在，2:超过可取消时间，-1:未知错误）  
  message  

8: BlackListController  

8.1: queryBlackList(callBack)  
查询黑名单，参数 回调函数  
obj:  
  queryStatus（0:成功，-1:未知错误）  
  blackList（黑名单列表，每项有account_id，account_name，拉黑日期startDate xxxx-xx-xx，拉黑时间startTime xx:xx:xx）  
  message  

8.2: addStudentIntoBlackList(accountId, callBack)  
拉黑，可在查询房间预约处点记录来拉黑学生。参数 学生id，回调函数  
obj:  
  addBlackListStatus（0:成功，1:用户名非法，2:用户已被拉黑，3:用户不存在，-1:未知错误）  
  message  

8.3: removeStudentFromBlackList(accountId, callBack)  
移出黑名单，可在查询完黑名单后点击每条拉黑记录移出。参数 学生id，回调函数  
obj:  
  removeStatus（0:成功，1:用户名非法，2:用户名不存在，-1:未知错误）  
  message  

9: AdminQueryController  

9.1: queryOrder(locationId, date, startTime, callBack)  
管理员查询预约，参数 地点id，日期，时间，回调函数  
obj:  
  queryStatus（0:成功，1:输入不合法，-1:未知错误）  
  orderList（预约列表，每项有预约号order_id, account_id, account_name, state, useSocket, location_id，timeslot_id，最后两项只是用来debug，不用显示）  
  message  
