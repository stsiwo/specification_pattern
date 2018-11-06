interface ISpecification<T> {

  IsSatisfiedBy(candidate: T): boolean;

  And(other: ISpecification<T>): ISpecification<T>;
  
  AndNot(other: ISpecification<T>): ISpecification<T>;

  Or(other: ISpecification<T>): ISpecification<T>;

  OrNot(other: ISpecification<T>): ISpecification<T>;

  Not(other: ISpecification<T>): ISpecification<T>;

}

export default ISpecification;
