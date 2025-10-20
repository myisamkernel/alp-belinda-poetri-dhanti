Access Policy List

***RBAC***

Supervisor

Route:

- /api/data (Get list data) (REST Method GET)
- /api/data (Store / add data) (REST Method POST)
- /api/data/:id (Delete Data) (REST Method DELETE)

Admin

Route:

- /api/data (Get list data) (REST Method GET)
- /api/data (Store / add data) (REST Method POST)

Operator

Route:

- /api/data (Get list data) (REST Method GET)

***ABAC***

*Depend on working hours and created by*

Supervisor

Route:

- /api/data/:id (Get one data depend on created_by field from data) (REST Method GET)

Admin

Route:

- /api/data/:id (Get one data depend on created_by field from data) (REST Method GET)


Operator

Route:

- /api/data/:id (Get one data depend on created_by field from data) (REST Method GET)

***RBAC & ABAC***

*Depend on working hours, roles and created by*

Supervisor

Route:

- /api/data (Edit data the only one allowed is authorized role write) (REST Method PUT)

Admin

Route:

- /api/data (Edit data the only one allowed is authorized role write) (REST Method PUT)
