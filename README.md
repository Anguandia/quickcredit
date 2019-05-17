[![Build Status](https://travis-ci.com/Anguandia/quickcredit.svg?branch=develop)](https://travis-ci.com/Anguandia/quickcredit)
# quickCredit
[![Coverage Status](https://coveralls.io/repos/github/Anguandia/quickcredit/badge.svg?branch=develop)](https://coveralls.io/github/Anguandia/quickcredit?branch=develop)
Browser based User Interface for an online lending platform that provides short term soft loans to individuals

### INTRODUCTION

> This product is a demonstration model of the user interface for an online individual soft loans app.
>
> The end-to-end application will provide a platform for clients, interchangeably called **users** herein to inquire about, solicit and get softloans and manage loan servicing all on the web

This user interface models the pages necessary to create the requisite functions of this undertaking including loan and user resource manipulation, validation and viewing
>
> Additionally, it also provides model interfaces for such user account operations as signup, profile edit, and signin for categories of users as client and administrator
>
> The product, though a non functional prototype, simulates the intended actual feel the intended integrated piece, One can go ahead and explore the functions and operations to get an impression of the functioning of the will-be complete product

### FEATURES
> The front-end package features the following;
>
> A familiar feel across all pages with the same header at the top, a similar navigation pane to the top-left beneath the header, a footer at the bottom and the main content in the middle with two columns for pages that in some way interact with the loans and a single section for those that do not, like the signup, signin
The entire page has a background image that shall be upgraded to animated images in the next version or mid-season there about.
>
>
> Other features include interfaces for:
  > - Full manipulation activities of creating, editing viewing making trackable and tracking, loan processes loans.
  >> Loan tracking is implemented by status updates from an administrator account and loans' dashboards in the admin account for a summary of loans by numbers in each of the categories of status
  > - User account management through creating and editing profile and account particulars
  > - A home page where non registered users can still view a listing of all public/non-confidential resources
  > - Optional username or email signin

### OPERATIONS AND FEATURES DESCRIPTION

#### HOME PAGE

  > ##### *Description*
  >
  > The default page accessed with the base URL. This page displays awelcome message and menu options for general information about loan services, [click here](https://anguandia.github.io/quickCredit/) to explore
  >
  > - It also comes with the \'universal\' navigation page providing links to the [signin](#signin) and [Signup](#signup) and pages
  >
  > ##### *Scope*
  >
  > This model can not authenticate users but does basic HTML validation. A simulated signin or signup can be achieved with any credentials as long as the forminputs pass the validation.
  >
  > ##### *Features and Operations Exploration*
  >
  > Clicking on the menu links will load the related sub-menus or pages.
  >
  > ##### *Prospects*
  >
  > The developer might consider using local browser storage to enforce some basic authentication as a challenge in the ampleness of time as well as creation and manipulation of browser storage-based real loan and client objects

#### SIGNUP

  > ##### *Description*
  >
  > The signup page is simple but sufficient, providing a signup form with mandatory fields marked in red and basic input data validation click [here](https://anguandia.github.io/quickCredit/signup.html) to see.
  >
  > ##### *Scope*
  >
  > Actual signup simulated with a redirect to a dummy user profile page
  >
  > ##### *Prospects*
  >
  > The model will be enhanced to lead to a profile page as the credentials entered forsignup.
  >
  > ##### *Features and Operations Exploration*
  >
  > Validation of the mandatory fields: Try submitting without filling in the fields marked as required or with a non email format input in any of the email field and observe the custom validation errors returned. After every try, refresh the page for subsequent trial
  >
  > Successful signup: Populate the signup formwith valid data for all mandatory fields and hit submit

 #### SIGNIN

   > ##### *Description*
   >
   > The [signin](https://anguandia.github.io/quickCredit/signin.html) page is equally simple but sufficient, providing a signin form which can take in either a username or email in combination with a password and a submit button that seeks the user signin type as either admin or user
   >
   > ##### *Scope*
   >
   >Full signin experience simulation is incorporated, providing action feedback for selection of signin type and even a virtual signin and redirect into a typical profile page of the user-type \'logged-in\'.
   >> Auto detection of user role would have been built into the page but the experience had to be sacrificed for the simulation of successful signin and access to subsequent pages. An understanding of this trade-off can be understood by looking at a summary of the technical [implementation summary](#technologies-used)
   >> The current version however falls short of providing a password reset link and alternative signin methods, ommitions from project planning
   >
   > ##### *Prospects*
   >
   > - Inclusion of social media signin, a password reset link and another linking back to signup page for non existent users as they are the highest on the inclusion agenda
   > - The select menu for signin-user role selection is only a demo to enable the user access the respective pages and have a feel of the final product. It therefore shall not be present in a working version of this product, the user-type determination being transferred to the user support modules of the back-end
   >
   > ##### *Features and Operations Exploration*
   >
   > - The test user should navigate to the signin page from the signin menu item in the top right on the [home page](#home-page)
   > - Enter any valid user credentials
   > - Select a type of user from the Signin as: select menu and hit submit

 #### USER PROFILE

   > ##### *Description*
   >
   > This is the page where a standard registered user is redirected on successful signin. See [here](https://anguandia.github.io/quickCredit/client.html) for a view
   > - The page defaults to a summary list display of all loans by the particular user in the main content section in the center. Clicking on a particular loan should display the loan [details](#loan-details)
   > - This summary loans record view provides a search field for inputting a loan id for searching a loan by its Id
   > - The loans' list can also be sorted by any of the fields by selecting from the select menu to the right of the search box
   > - Left is the user menu pane with menu items that open different user action pages viz;
   >> - The apply for a loan menu item which loads loan [application](#apply) form
   >>  - The update account button in the extreme right section is a link to the user account related [operations](#account-page) of profile and security management
   >
   > ##### *Scope*
   >
   > - This version only goes as far as enabling searching and sorting of the loans displayed in the user view section, selecting any given loan from the list by clicking on it opens the same hard-coded sample detail page
   > - Filtering is only limited to by-Id for demo purposes
   > - Sorting is fully implemented
   >
   > ##### *Prospects*
   >
   > - Subsequent versions will incorporate both single and multiple loan selection from the list display
   > - Searching by any field will be enabled in the next version
   > - A provision will be made to reverse the sorting order
   >
   > ##### *Features and Operations Exploration*
   >
   > - signin as admin [directions here](#signin) for logging in
   > - Key in an existing Id from the list
   >>  You will see the the list being filtered out as you keep keying in the serial number if in list, else, all loans will be filtered out if no match for number keyed in
   > - Select \"loan id\" in the sortby menu to sort by id, or respective field name to sort by field
   > - You will see the loans sorted by id or chosen field in ascending order

 #### LOAN DETAILS

   > ##### *Description*
   >
   > This is actually the crux of loan [operations](https://anguandia.github.io/quickCredit/detail.html) and provides the following hidden buttons for loan and client management;
   > - Verify/Reject user buttons for verifying clients
   > - Approve/Reject loan application buttons for the named purposes
   > - A single 'Post Payment' button to enable the admin debit theloan account
   > - The given loan is displayed in detail in the main content window and if a current lone, a log of all related transactions appended. All button actions return a feedback message with appropriate conventional coloring; red for rejection, yellow - warning and green; success
   > These are implicit buttons, each is only exposed in its respective page listed here under;
   >
   > ##### *Scope*
   >
   > All the loan status altering operations are fully simulated future versions will probably factor in real local loan demo operations
   >

 #### APPLY FOR A LOAN

   > ##### *Description*

   > - This page displays a self descriptive form for inputting the new loan details in the main content window see [here](https://anguandia.github.io/quickCredit/apply.html) for exploration of features
   >
   > ##### *Scope*
   >
   > All operation simulations included
   >
   > ##### *Features and Operations Exploration*

 #### ACCOUNT PAGE

   > ##### *Description*
   >
   > This page features a set of four button interfaces for the respective functions of changing the user password, name and profile picture.  Click [here](https://anguandia.github.io/quickCredit/account.html) for a tour of the features
   >
   > ##### *Scope*
   >
   > - only change password operation has been simulated
   > - Same for all users
   >
   > ##### *Prospects*
   >
   > Subsequent versions will have a provision for editing user contact details as well. The profile section will also be upgraded to cater for user feedback and new developments
   >
   > ##### *Features and Operations Exploration*
   >
   > Click on the change password button and follow through to get a virtual experience of the product

### TECHNOLOGIES USED
>
> 1. HTML for the document structure
> 2. CSS for the document layout and looks
> 3. JAVA SCRIPT
  > - For implementing interactive actions with page and greatly so, for simulating actual behavior of the different pages when in service
  > - For collecting reusable components across pages to eliminate repetition and allow external styling since html object tags, i-frames and html fragment includes are tricky in implementation

### ACKNOWLEDGEMENTS:

> A great deal of indebtedness to Andela for providing not only an opportunity to explore and exploit talent, but also the environment, resources and nurturing
>

### PRODUCT LINKS AND RELATED INFORMATION
> 1. Code repository: <https://github.com/Anguandia/quickCredit> is a public repository. Contributions and comments will be appreciated
> 2. Link for hosting: <https://anguandia.github.io/quickCredit/> is where the product is hosted.
> 3. Pivotal tracker: <https://www.pivotaltracker.com/n/projects/2329098> is the link containing the project plan and implementation details.
