<Tabs :currentIndex="currentIndex" @onIndex="getIndex">
    <Tab index="1" label="tab1">
        <div>内容1</div>
    </Tab>
    <Tab index="2" label="tab2">
        <div>内容2</div>
    </Tab>
    <Tab index="3" label="tab3">
        <div>内容3</div>
    </Tab>
</Tabs>

<script>
export default {
    data(){
        return{
            currentIndex:"1"
        }
    },
    methods:{
        getIndex(index){
            // index下标
        }
    }
}
</script>