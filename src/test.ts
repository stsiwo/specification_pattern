import CompositeSpecification from "./CompositeSpecification";
import ISpecification from "./ISpecification";

class UserWithPremiumSpecification<T extends IUser> extends CompositeSpecification<T> {

  private cost: number;

  constructor(cost: number) {
    super();
    this.cost = cost;
  }

  IsSatisfiedBy(candidate: T) {
    return candidate.cost >= this.cost;
  }
}

class UserWithMale<T extends IUser> extends CompositeSpecification<T> {

  private readonly gender = "male";

  IsSatisfiedBy(candidate: T) {
    return candidate.gender == this.gender;
  }
}

interface IUser {

  cost: number;

  gender: string;

}

class User implements IUser {

  public name: string;

  public cost: number;

  public gender: string;

  constructor(name: string, cost: number, gender: string) {
    this.name = name;
    this.cost = cost;
    this.gender = gender;
  }
}

let users: User[] = [
  new User("satoshi", 100, "male"),
  new User("hitomi", 50, "female"),
  new User("kaoru", 80, "male"),
  new User("seiko", 90, "female"),
  new User("yoichi", 110, "male"),
];

let premiumSpec: ISpecification<User> = new UserWithPremiumSpecification<User>(90);
let maleSpec: ISpecification<User> = new UserWithMale<User>();
let specs: ISpecification<User> = premiumSpec.AndNot(maleSpec);

let filteredUsers: User[] = users.map(( user ) => {
  if (specs.IsSatisfiedBy(user)) return user;
});

console.log(filteredUsers);




