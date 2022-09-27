import {AddressAPI} from "@/api";

export default {
        namespaced: true,
        state: {
                list: [], //存地址列表的数据
                _isInit: false
        },
        getters: {
                defaultAddress(state) {
                        return state.list.find(item => item.isDefault === 1);
                }
        },
        mutations: {
                _init(state,payload) {
                        state.list = payload;
                        state._isInit = true;
                },
                _setDefault(state,payload) {
                        state.list.find(item => item.isDefault === 1).isDefault = 0;
                        state.list.find(item => item.id === payload).isDefault = 1;
                },
                _remove(state,payload) {
                        var i = state.list.findIndex(item => item.id === payload);
                        state.list.splice(i, 1);
                },
                _add(state,payload) {
                        state.list.push(payload);
               },
                _update(state,payload) {
                        let i = state.list.findIndex(item => item.id === payload.id);
                        state.list.splice(i, 1, payload);
                }
        },
        actions: {
                async init({state,commit}) {
                                if(state._isInit) return;
                                const list = await AddressAPI.get();
                                commit('_init',list);
                },
                async setDefault({commit},payload) {
                        await AddressAPI.setDefault(payload);
                        commit('_setDefault',payload);
                },
                async remove(context,payload) {
                        await AddressAPI.remove(payload)
                        context.commit('_remove',payload);
                },
               async add({commit}, payload) {
                                payload.id= await AddressAPI.add(payload);
                                commit('_add',payload);
               },
                async update({commit},payload) {
                                await AddressAPI.update(payload);
                                commit('_update',payload);
                }
        }
};