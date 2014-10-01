YUI.add('aui-form-builder-II-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-II');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder II Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createFormBuilder({
                boundingBox: '#content'
            });
        },

        tearDown: function() {
            this._formBuilder && this._formBuilder.destroy();
        },

        createFormBuilder: function(config) {
            var content = Y.Node.create('<div id="content" />');

            this._container.append(content);
            this._formBuilder = new Y.FormBuilderII(config).render();
        },

        'should add a new field type on form': function() {
            var formBuilder = this._formBuilder;

            formBuilder.registerFieldTypes([{
                icon: 'icon1'
            }]);
            Y.Assert.isNotNull(Y.one('.icon1'));

            formBuilder.registerFieldTypes({icon: 'icon2'});
            Y.Assert.isNotNull(Y.one('.icon2'));

            formBuilder.registerFieldTypes([
                new Y.FormBuilderIIFieldType({
                    icon: 'icon3'
                })
            ]);
            Y.Assert.isNotNull(Y.one('.icon3'));

            formBuilder.registerFieldTypes(
                new Y.FormBuilderIIFieldType({
                    icon: 'icon4'
                })
            );
            Y.Assert.isNotNull(Y.one('.icon4'));
        },

        'should remove a field type from form': function() {
            var formBuilder = this._formBuilder,
                fieldType1 = new Y.FormBuilderIIFieldType({
                    icon: 'icon-test'
                });

            formBuilder.registerFieldTypes(fieldType1);

            formBuilder.unregisterFieldTypes(new Y.FormBuilderIIFieldType({icon: 'icon-test'}));
            Y.Assert.isNotNull(Y.one('.icon-test'));

            Y.Assert.isNotNull(Y.one('.icon-test'));
            formBuilder.unregisterFieldTypes(fieldType1);
            Y.Assert.isNull(Y.one('.icon-test'));
        },

        'should remove field types by field class': function() {
            this._formBuilder.registerFieldTypes([
                {
                    fieldClass: 'Class1'
                },
                {
                    fieldClass: 'Class2'
                },
                {
                    fieldClass: 'Class1'
                }
            ]);

            this._formBuilder.unregisterFieldTypes('Class1');
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);

            this._formBuilder.unregisterFieldTypes('Class3');
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);
        },

        'should remove multiple field types on same call': function() {
            var fieldType1 = new Y.FormBuilderIIFieldType({
                fieldClass: 'Class1'
            });

            this._formBuilder.registerFieldTypes([
                fieldType1,
                {
                    fieldClass: 'Class2'
                },
                {
                    fieldClass: 'Class2'
                },
                {
                    fieldClass: 'Class3'
                }
            ]);

            this._formBuilder.unregisterFieldTypes(['Class2', fieldType1]);
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);
            Y.Assert.areEqual(
                'Class3',
                this._formBuilder.get('fieldTypes')[0].get('fieldClass')
            );
        },

        'should show the form builder modal': function() {
            var formBuilder = this._formBuilder,
                formBuilderModal = Y.one('.form-builder-modal');

            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));

            formBuilder.showFieldsPanel();
            Y.Assert.isFalse(formBuilderModal.hasClass('modal-dialog-hidden'));

            formBuilder.hideFieldsPanel();
            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-form-builder-II', 'test']
});