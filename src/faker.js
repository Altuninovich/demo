import faker from 'faker';

const obj = {
    lorem: {
        sentence() {
            if (this.test) {
                return 'sentence for test';
            }
            return faker.lorem.sentence();
        },
    },
};

export default obj;