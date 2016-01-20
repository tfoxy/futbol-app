export default cardTypeFactory;

function cardTypeFactory(DS) {
  'ngInject';

  let CardType = DS.defineResource({
    name: 'cardType'
  });

  CardType.inject([{
    id: 1,
    name: 'amarilla',
    severity: 1
  }, {
    id: 2,
    name: 'roja',
    severity: 3
  }]);

  return CardType;
}
