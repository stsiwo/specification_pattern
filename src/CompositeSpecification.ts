import ISpecification from "./ISpecification";

abstract class CompositeSpecification<T> implements ISpecification<T> {


  abstract IsSatisfiedBy(candidate: T): boolean;

  And(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification<T>(this, other);
  }

  AndNot(other: ISpecification<T>): ISpecification<T> {
    return new AndNotSpecification<T>(this, other);
  }

  Or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification<T>(this, other);
  }

  OrNot(other: ISpecification<T>): ISpecification<T> {
    return new OrNotSpecification<T>(this, other);
  }

  Not(): ISpecification<T> {
    return new NotSpecification<T>(this);
  }

}

class AndSpecification<T> extends CompositeSpecification<T> {

  private left: ISpecification<T>;

  private right: ISpecification<T>;

  constructor(left: ISpecification<T>, right: ISpecification<T>) {
    super();
    this.left = left;
    this.right = right;
  }

  IsSatisfiedBy(candidate: T) {
    return this.left.IsSatisfiedBy(candidate) && this.right.IsSatisfiedBy(candidate);
  }
}

class AndNotSpecification<T> extends CompositeSpecification<T> {

  private left: ISpecification<T>;

  private right: ISpecification<T>;

  constructor(left: ISpecification<T>, right: ISpecification<T>) {
    super();
    this.left = left;
    this.right = right;
  }

  IsSatisfiedBy(candidate: T) {
    return this.left.IsSatisfiedBy(candidate) && this.right.IsSatisfiedBy(candidate) != true;
  }
}

class OrSpecification<T> extends CompositeSpecification<T> {

  private left: ISpecification<T>;

  private right: ISpecification<T>;

  constructor(left: ISpecification<T>, right: ISpecification<T>) {
    super();
    this.left = left;
    this.right = right;
  }

  IsSatisfiedBy(candidate: T) {
    return this.left.IsSatisfiedBy(candidate) || this.right.IsSatisfiedBy(candidate);
  }
}

class OrNotSpecification<T> extends CompositeSpecification<T> {

  private left: ISpecification<T>;

  private right: ISpecification<T>;

  constructor(left: ISpecification<T>, right: ISpecification<T>) {
    super();
    this.left = left;
    this.right = right;
  }

  IsSatisfiedBy(candidate: T) {
    return this.left.IsSatisfiedBy(candidate) && this.right.IsSatisfiedBy(candidate) != true;
  }
}

class NotSpecification<T> extends CompositeSpecification<T> {

  private other: ISpecification<T>;

  constructor(other: ISpecification<T>) {
    super();
    this.other = other;
  }

  IsSatisfiedBy(candidate: T) {
    return !this.other.IsSatisfiedBy(candidate); 
  }
}


export default CompositeSpecification;
